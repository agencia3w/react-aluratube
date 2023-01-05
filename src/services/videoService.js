import { createClient } from '@supabase/supabase-js'

const PROJECT_URL = 'https://ilewblbxmxdxzwedlwhc.supabase.co'
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlsZXdibGJ4bXhkeHp3ZWRsd2hjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzI4NjE0NTAsImV4cCI6MTk4ODQzNzQ1MH0.bv34XY4NWeZo2UfyiWwRbBVZXM3wkpqZ7BJoiTK58AQ'
const supabase = createClient(PROJECT_URL, API_KEY)

export function videoService() {
    return {
        getAllVideos() {
            return supabase.from('videos')
                .select('*').order('id', { ascending: false })
        },
        getVideoDetails(id) {
            return supabase.from('videos')
                .select('*')
                .eq('id', id)
        },
        youTubeGetID(url) {
            var ID = '';
            url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
            if (url[2] !== undefined) {
                ID = url[2].split(/[^0-9a-z_\-]/i);
                ID = ID[0];
            }
            else {
                ID = url;
            }
            return ID;
        }
    }
}