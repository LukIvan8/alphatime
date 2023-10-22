export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      admins: {
        Row: {
          email: string
          id: number
        }
        Insert: {
          email: string
          id?: number
        }
        Update: {
          email?: string
          id?: number
        }
        Relationships: []
      }
      classes: {
        Row: {
          auditory: string | null
          date: string | null
          divided: boolean
          id: number
          subject: string
          teacher: string | null
          time_end: string | null
          time_start: string
          timetable: string | null
          type: string | null
          variable: number
          weekday: number | null
        }
        Insert: {
          auditory?: string | null
          date?: string | null
          divided: boolean
          id?: number
          subject: string
          teacher?: string | null
          time_end?: string | null
          time_start: string
          timetable?: string | null
          type?: string | null
          variable?: number
          weekday?: number | null
        }
        Update: {
          auditory?: string | null
          date?: string | null
          divided?: boolean
          id?: number
          subject?: string
          teacher?: string | null
          time_end?: string | null
          time_start?: string
          timetable?: string | null
          type?: string | null
          variable?: number
          weekday?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "classes_timetable_fkey"
            columns: ["timetable"]
            referencedRelation: "timetable"
            referencedColumns: ["id"]
          }
        ]
      }
      timetable: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name?: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      "timetable-admins": {
        Row: {
          admin_id: number
          id: number
          timetable_id: string
        }
        Insert: {
          admin_id: number
          id?: number
          timetable_id: string
        }
        Update: {
          admin_id?: number
          id?: number
          timetable_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "timetable-admins_admin_id_fkey"
            columns: ["admin_id"]
            referencedRelation: "admins"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "timetable-admins_timetable_id_fkey"
            columns: ["timetable_id"]
            referencedRelation: "timetable"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
