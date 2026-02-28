import { supabase } from "../config/supabaseClient.js";

export const createChallenge = async (req, res, next) => {
  try {
    const { title, description, duration_days } = req.body;

    const { data, error } = await supabase
      .from("challenges")
      .insert([{
        title,
        description,
        duration_days,
        start_date: new Date()
      }])
      .select();

    if (error) throw error;

    res.status(201).json(data[0]);
  } catch (error) {
    next(error);
  }
};

export const getChallenges = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from("challenges")
      .select("*");

    if (error) throw error;

    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const joinChallenge = async (req, res, next) => {
  try {
    const { challenge_id } = req.body;

    const { data, error } = await supabase
      .from("challenge_participants")
      .insert([{
        challenge_id,
        user_id: req.user.id,
        progress: 0
      }])
      .select();

    if (error) throw error;

    res.status(201).json(data[0]);
  } catch (error) {
    next(error);
  }
};

export const updateProgress = async (req, res, next) => {
  try {
    const { challenge_id } = req.params;
    const { progress } = req.body;

    const { error } = await supabase
      .from("challenge_participants")
      .update({ progress })
      .eq("challenge_id", challenge_id)
      .eq("user_id", req.user.id);

    if (error) throw error;

    res.json({ message: "Progress updated" });
  } catch (error) {
    next(error);
  }
};