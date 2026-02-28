import { supabase } from "../config/supabaseClient.js";

export const createGoal = async (req, res, next) => {
  try {
    const { habit_id, goal_target, goal_type } = req.body;

    const { data, error } = await supabase
      .from("goals")
      .insert([{ habit_id, goal_target, goal_type }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export const getGoals = async (req, res, next) => {
  try {
    const { data, error } = await supabase.from("goals").select("*");

    if (error) throw error;

    res.json(data);
  } catch (error) {
    next(error);
  }
};