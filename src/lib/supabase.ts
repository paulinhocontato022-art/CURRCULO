import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Please configure .env file.');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder'
);

// Tipagem para o banco de dados (simplificada)
export type Database = {
  public: {
    Tables: {
      resumes: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          content: any; // JSONB com os dados do currículo
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title?: string;
          content: any;
          updated_at?: string;
        };
        Update: {
          title?: string;
          content?: any;
          updated_at?: string;
        };
      };
    };
  };
};
