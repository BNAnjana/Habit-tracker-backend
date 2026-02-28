import { supabase } from "../config/supabaseClient.js";

export const getHabits = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from("habits")
      .select("*")
      .eq("user_id", req.user.id);

    if (error) throw error;

    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const createHabit = async (req, res, next) => {
  try {
    const {
      title,
      description,
      difficulty,
      target_value,
      reminder_time,
      category_id,
    } = req.body;

    const { data, error } = await supabase
      .from("habits")
      .insert([
        {
          title,
          description,
          difficulty,
          target_value,
          reminder_time,
          category_id,
          user_id: req.user.id,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export const updateHabit = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("habits")
      .update(req.body)
      .eq("id", id)
      .eq("user_id", req.user.id)
      .select()
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const deleteHabit = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("habits")
      .delete()
      .eq("id", id)
      .eq("user_id", req.user.id);

    if (error) throw error;

    res.json({ message: "Habit deleted" });
  } catch (error) {
    next(error);
  }
};

export const logHabit = async (req, res, next) => {
  try {
    const { id } = req.params;

    const today = new Date().toISOString().split("T")[0];

    const { error } = await supabase.from("habit_logs").insert([
      {
        habit_id: id,
        completed_date: today,
      },
    ]);

    if (error) throw error;

    res.json({ message: "Habit logged successfully" });
  } catch (error) {
    next(error);
  }
};