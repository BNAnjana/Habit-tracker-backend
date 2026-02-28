import { supabase } from "../config/supabaseClient.js";

export const getAchievements = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("achievements")
      .select("*")
      .eq("user_id", req.user.id);

    if (error) throw error;

    res.json(data || []);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};