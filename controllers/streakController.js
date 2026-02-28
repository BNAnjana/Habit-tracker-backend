import { supabase } from "../config/supabaseClient.js";

export const getStreak = async (req, res, next) => {
  try {
    const { habit_id } = req.params;

    const { data, error } = await supabase
      .from("streaks")
      .select("*")
      .eq("habit_id", habit_id)
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    next(error);
  }
};