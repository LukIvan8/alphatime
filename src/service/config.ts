import { createClient } from "@supabase/supabase-js";
import { Database } from "../../database.types";

export const sb = createClient<Database>(
  "https://cxtrcenglrxvlcvgxxzo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4dHJjZW5nbHJ4dmxjdmd4eHpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYxNDA2NTUsImV4cCI6MjAxMTcxNjY1NX0.zOaMAVqgcAjt9j3Fae2bBe3ckcbsBSl0dVk5G6PZBHg"
);
