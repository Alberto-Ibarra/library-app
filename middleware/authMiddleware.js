import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        return res.status(403).json({ message: "Access denied" });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

export const verifyAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    console.log(token);
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // your secret
        console.log(decode.role);
        
        if (decoded.role !== 'Admin') {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        req.user = decoded; // if needed later
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid token" });
    }
};
