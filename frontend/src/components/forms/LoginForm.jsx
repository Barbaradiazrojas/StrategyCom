import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { emailSchema, passwordSchema } from '../../utils/validators';

const schema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export default function LoginForm({ onSubmit, loading }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          id="email"
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          {...register('email')}
          placeholder="tu@email.com"
        />
        {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">Contraseña</label>
        <input
          type="password"
          id="password"
          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          {...register('password')}
          placeholder="••••••••"
        />
        {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
      </div>

      <button type="submit" className="btn btn-primary w-100" disabled={loading}>
        {loading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
            Iniciando sesión...
          </>
        ) : 'Iniciar Sesión'}
      </button>
    </form>
  );
}
