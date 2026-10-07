const pool = require("../db");
const crypto = require("crypto");


const createConnectionCode = async (req, res) => {

    try {
        const userId = req.chat;
        const code = crypto.randomBytes(4).toString("hex").toUpperCase().slice(0, 6);

        codeHash = crypto.createHash("sha256").update(code).digest("hex");

        const expiresAt = new Date(Date.now() + 2 * 60 * 1000);

        await pool.query(`
            INSERT INTO connection_codes
                (code_hash, owner_id, expires_at, max_uses, used_count)
            VALUES
                ($1, $2, $3, $4, $5)
            `,
            [codeHash, userId, expiresAt, 1, 0]
        );

        return res.status(201).json({
            success: true,
            message: "Connection code created",
            code,
            expiresAt
        });

    } catch (error) {
        console.error("Create connection code error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create connection code"
        });
    }
};



const joinConnection = async (req, res) => {
    const client = await pool.connect();
    try {
        const userId = req.chat;
        const { code } = req.body;

        if (!code || typeof code !== "string") {
            return res.status(400).json({
                success: false,
                message: "Connection code is required"
            });
        }

        const cleanCode = code.trim().toUpperCase();

        if (cleanCode.length != 6) {
            return res.status(400).json({
                success: false,
                message: "Invalid connection code"
            });
        }

        const codeHash = crypto
            .createHash("sha256")
            .update(cleanCode)
            .digest("hex");

        await client.query("BEGIN");

        const codeResult = await client.query(
            `
            SELECT code_hash, owner_id, expires_at, max_uses, used_count
            FROM connection_codes
            WHERE code_hash = $1
            FOR UPDATE
            `,
            [codeHash]
        );
        if (codeResult.rows.length === 0) {
            await client.query("ROLLBACK");

            return res.status(404).json({
                success: false,
                message: "Invalid connection code"
            });
        }

        const connectionCode = codeResult.rows[0];

        if (new Date(connectionCode.expires_at) <= new Date()) {
            await client.query("ROLLBACK");

            return res.status(410).json({
                success: false,
                message: "Connection code has expired"
            });

        }

        if (
            connectionCode.used_count >=
            connectionCode.max_uses
        ) {
            await client.query("ROLLBACK");

            return res.status(409).json({
                success: false,
                message: "Connection code has already been used"
            });
        }

        const ownerId = connectionCode.owner_id;

        if (ownerId === userId) {
            await client.query("ROLLBACK");

            return res.status(400).json({
                success: false,
                message: "You cannot use your own connection code"
            })
        }

        const [userA, userB] =
            ownerId < userId
                ? [ownerId, userId]
                : [userId, ownerId];

        // Check if already connected
        const existingConnection = await client.query(
            `
            SELECT user_a, user_b
            FROM connections
            WHERE user_a = $1
              AND user_b = $2
            `,
            [userA, userB]
        );

        if (existingConnection.rows.length > 0) {
            await client.query("ROLLBACK");

            return res.status(409).json({
                success: false,
                message: "You are already connected"
            });
        }

        const connectionResult = await client.query(
            `
            INSERT INTO connections
                (
                    user_a,
                    user_b
                )
            VALUES
                ($1, $2)
            RETURNING
                user_a,
                user_b,
                created_at
            `,
            [userA, userB]
        );

        await client.query(
            `
            UPDATE connection_codes
            SET used_count = used_count + 1
            WHERE code_hash = $1
            `,
            [codeHash]
        );

        await client.query("COMMIT");

        return res.status(201).json({
            success: true,
            message: "Connection created successfully",
            connection: connectionResult.rows[0]
        });


    } catch (error) {
        await client.query("ROLLBACK");

        console.error(
            "Join connection error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to create connection"
        });

    } finally {
        client.release();
    }
};



const getConnections = async (req, res) => {
    try {
        const userId = req.chat;

        const result = await pool.query(
            `
            SELECT c.user_a, c.user_b, c.created_at,

                CASE
                    WHEN c.user_a = $1
                    THEN u2.id
                    ELSE u1.id
                END AS user_id,

                CASE
                    WHEN c.user_a = $1
                    THEN u2.username
                    ELSE u1.username
                END AS username

            FROM connections c

            JOIN users u1
                ON u1.id = c.user_a

            JOIN users u2
                ON u2.id = c.user_b

            WHERE c.user_a = $1
               OR c.user_b = $1

            ORDER BY c.created_at DESC
            `,
            [userId]
        );

        return res.status(200).json({
            success: true,
            connections: result.rows
        });

    } catch (error) {

        console.error(
            "Get connections error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to get connections"
        });
    }
};


const deleteConnection = async (req, res) => {
    try {
        const currentUserId = req.chat;
        const otherUserId = req.params.userId;

        if (currentUserId === otherUserId) {
            return res.status(400).json({
                success: false,
                message: "Invalid user"
            });
        }

        const [userA, userB] =
            currentUserId < otherUserId
                ? [currentUserId, otherUserId]
                : [otherUserId, currentUserId];

        const result = await pool.query(
            `
            DELETE FROM connections
            WHERE user_a = $1
              AND user_b = $2
            RETURNING user_a, user_b
            `,
            [userA, userB]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Connection not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Connection removed successfully"
        });

    } catch (error) {

        console.error(
            "Delete connection error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to remove connection"
        });
    }
};


module.exports = {
    createConnectionCode,
    joinConnection,
    getConnections,
    deleteConnection
};