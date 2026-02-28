import { supabase } from "../config/supabaseClient.js";

export const calculateStreak = async (habitId) => {
  const { data } = await supabase
    .from("habit_logs")
    .select("completed_date")
    .eq("habit_id", habitId)
    .order("completed_date", { ascending: false });

  let current = 0;
  let longest = 0;

  const today = new Date();

  for (let i = 0; i < data.length; i++) {
    const logDate = new Date(data[i].completed_date);
    const diff =
      (today - logDate) / (1000 * 60 * 60 * 24);

    if (Math.floor(diff) === i) {
      current++;
      longest = Math.max(longest, current);
    } else {
      break;
    }
  }

  await supabase.from("streaks").upsert([
    {
      habit_id: habitId,
      current_streak: current,
      longest_streak: longest,
    },
  ]);
};