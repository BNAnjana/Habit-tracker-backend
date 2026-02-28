import { supabase } from "../config/supabaseClient.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateToken = (id, name, email) => {
  return jwt.sign({ id, name, email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from("users")
    .insert([{ name, email, password: hashedPassword }])
    .select()
    .single();

  if (error) return res.status(400).json({ message: error.message });

  res.status(201).json({
    message: "User registered successfully",
    token: generateToken(data.id, data.name, data.email),
    user: data,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  res.json({
    token: generateToken(user.id, user.name, user.email),
    user,
  });
};