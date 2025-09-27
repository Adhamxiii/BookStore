import jwt from "jsonwebtoken";

export const auth = (requiredRoles = null) => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization || "";
      const [scheme, token] = authHeader.split(" ");
      if (scheme !== "Bearer" || !token) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (Array.isArray(requiredRoles) && requiredRoles.length > 0) {
        if (!decoded?.role || !requiredRoles.includes(decoded.role)) {
          return res.status(403).json({ message: "Access denied" });
        }
      } else if (typeof requiredRoles === "string" && requiredRoles) {
        if (!decoded?.role || decoded.role !== requiredRoles) {
          return res.status(403).json({ message: "Access denied" });
        }
      }

      next();
    } catch (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  };
};

export const cookieAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
