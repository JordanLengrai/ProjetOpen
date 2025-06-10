import { supabase } from '../supabaseClient';

function LoginButton() {
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'discord' });
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-[#5865F2] hover:bg-[#404eed] text-white px-4 py-2 rounded-lg font-semibold transition"
    >
      Se connecter avec Discord
    </button>
  );
}

export default LoginButton;
