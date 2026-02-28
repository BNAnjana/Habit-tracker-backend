import { supabase } from "../config/supabaseClient.js";

export const getCategories = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("user_id", req.user.id);

    if (error) throw error;

    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    const { data, error } = await supabase
      .from("categories")
      .insert([{ name, user_id: req.user.id }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", id)
      .eq("user_id", req.user.id);

    if (error) throw error;

    res.json({ message: "Category deleted" });
  } catch (error) {
    next(error);
  }
};