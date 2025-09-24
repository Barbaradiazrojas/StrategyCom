import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import RegisterForm from '../../components/forms/RegisterForm';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (userData) => {
    setLoading(true);
    const result = await register(userData);
    if (result.success) {
      navigate('/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="container" style={{ marginTop: '100px', maxWidth: '600px' }}>
      <div className="card shadow-sm">
        <div className="card-body p-4">
          <h2 className="text-center mb-4">Crear Cuenta</h2>
          <RegisterForm onSubmit={handleRegister} loading={loading} />
          <div className="text-center mt-3">
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
