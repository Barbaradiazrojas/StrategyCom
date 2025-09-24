import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoginForm from '../../components/forms/LoginForm';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (credentials) => {
    setLoading(true);
    const result = await login(credentials);
    if (result.success) {
      navigate('/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="container" style={{ marginTop: '100px', maxWidth: '500px' }}>
      <div className="card shadow-sm">
        <div className="card-body p-4">
          <h2 className="text-center mb-4">Iniciar Sesión</h2>
          <LoginForm onSubmit={handleLogin} loading={loading} />
          <div className="text-center mt-3">
            <Link to="/forgot-password" className="text-muted">¿Olvidaste tu contraseña?</Link>
          </div>
          <div className="text-center mt-2">
            ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
