import { supabase } from "../config/supabaseClient.js";

export const getWeeklyReport = async (req, res) => {
  try {
    const userId = req.user.id;

    const today = new Date();
    const last7Days = new Date();
    last7Days.setDate(today.getDate() - 7);

    const { data, error } = await supabase
      .from("habit_logs")
      .select(`
        completed_date,
        value,
        habits!inner(user_id)
      `)
      .eq("habits.user_id", userId)
      .gte("completed_date", last7Days.toISOString().split("T")[0]);

    if (error) throw error;

    const totalLogs = data.length;

    res.json({
      totalLogs,
      logs: data
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getMonthlyReport = async (req, res) => {
  try {
    const userId = req.user.id;

    const today = new Date();
    const last30Days = new Date();
    last30Days.setDate(today.getDate() - 30);

    const { data, error } = await supabase
      .from("habit_logs")
      .select(`
        completed_date,
        value,
        habits!inner(user_id)
      `)
      .eq("habits.user_id", userId)
      .gte("completed_date", last30Days.toISOString().split("T")[0]);

    if (error) throw error;

    const totalLogs = data.length;

    res.json({
      totalLogs,
      logs: data
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};