import { supabase } from "../config/supabaseClient.js";

export const getAnalytics = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get all habits
    const { data: habits, error: habitError } = await supabase
      .from("habits")
      .select("*")
      .eq("user_id", userId);

    if (habitError) throw habitError;

    // Get streaks
    const { data: streaks, error: streakError } = await supabase
      .from("streaks")
      .select(`
        longest_streak,
        habits!inner(user_id)
      `)
      .eq("habits.user_id", userId);

    if (streakError) throw streakError;

    // Get logs
    const { data: logs, error: logError } = await supabase
      .from("habit_logs")
      .select(`
        completed_date,
        habit_id,
        habits!inner(user_id)
      `)
      .eq("habits.user_id", userId);

    if (logError) throw logError;

    const totalHabits = habits.length;
    const totalLogs = logs.length;

    const completionRate =
      totalHabits > 0 ? Math.round((totalLogs / (totalHabits * 30)) * 100) : 0;

    const bestStreak = streaks.length
      ? Math.max(...streaks.map((s) => s.longest_streak))
      : 0;

    res.json({
      totalHabits,
      totalLogs,
      completionRate,
      bestStreak
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};