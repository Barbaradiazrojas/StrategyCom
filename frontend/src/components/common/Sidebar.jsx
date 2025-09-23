<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>StrategyPro - Plataforma Plan de Negocio</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        :root {
            --primary-color: #2563eb;
            --secondary-color: #f8fafc;
            --accent-color: #10b981;
            --sidebar-width: 280px;
            --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            --gradient-secondary: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: var(--secondary-color);
        }

        /* Public Navbar */
        .public-navbar {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            box-shadow: 0 2px 20px rgba(0,0,0,0.1);
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1050;
            transition: all 0.3s ease;
        }

        .navbar-brand {
            font-weight: 700;
            font-size: 1.5rem;
            background: var(--gradient-primary);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .nav-link {
            font-weight: 500;
            color: #475569;
            transition: all 0.3s ease;
            position: relative;
        }

        .nav-link:hover {
            color: var(--primary-color);
        }

        .nav-link::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 0;
            height: 2px;
            background: var(--primary-color);
            transition: width 0.3s ease;
        }

        .nav-link:hover::after {
            width: 100%;
        }

        .btn-login {
            border: 2px solid var(--primary-color);
            color: var(--primary-color);
            font-weight: 500;
            border-radius: 25px;
            padding: 0.5rem 1.5rem;
            transition: all 0.3s ease;
        }

        .btn-login:hover {
            background: var(--primary-color);
            color: white;
        }

        .btn-register {
            background: var(--gradient-primary);
            border: none;
            color: white;
            font-weight: 500;
            border-radius: 25px;
            padding: 0.5rem 1.5rem;
            transition: all 0.3s ease;
        }

        .btn-register:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }

        /* Hero Section */
        .hero-section {
            margin-top: 80px;
            min-height: 80vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            color: white;
            position: relative;
            overflow: hidden;
        }

        .hero-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><polygon fill="rgba(255,255,255,0.05)" points="0,1000 1000,0 1000,1000"/></svg>');
            background-size: cover;
        }

        .hero-content {
            position: relative;
            z-index: 2;
        }

        .hero-title {
            font-size: 3.5rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            line-height: 1.2;
        }

        .hero-subtitle {
            font-size: 1.25rem;
            opacity: 0.9;
            margin-bottom: 2rem;
        }

        .btn-hero {
            background: rgba(255, 255, 255, 0.2);
            border: 2px solid white;
            color: white;
            font-weight: 600;
            border-radius: 30px;
            padding: 1rem 2rem;
            font-size: 1.1rem;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
        }

        .btn-hero:hover {
            background: white;
            color: var(--primary-color);
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }

        /* Feature Cards */
        .feature-card {
            background: white;
            border-radius: 20px;
            padding: 2rem;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
            border: 1px solid #e2e8f0;
            height: 100%;
        }

        .feature-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }

        .feature-icon {
            width: 80px;
            height: 80px;
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            margin-bottom: 1.5rem;
            color: white;
        }

        .feature-title {
            font-size: 1.25rem;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 1rem;
        }

        .feature-description {
            color: #64748b;
            line-height: 1.6;
        }

        /* About Section */
        .about-section {
            padding: 5rem 0;
            background: white;
        }

        .section-title {
            font-size: 2.5rem;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 1rem;
            text-align: center;
        }

        .section-subtitle {
            font-size: 1.1rem;
            color: #64748b;
            text-align: center;
            margin-bottom: 3rem;
        }

        /* Milestones */
        .milestone-item {
            background: white;
            border-radius: 15px;
            padding: 2rem;
            box-shadow: 0 5px 20px rgba(0,0,0,0.08);
            margin-bottom: 2rem;
            position: relative;
            overflow: hidden;
        }

        .milestone-item::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 5px;
            background: var(--gradient-primary);
        }

        .milestone-date {
            color: var(--primary-color);
            font-weight: 700;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .milestone-title {
            font-size: 1.25rem;
            font-weight: 600;
            color: #1e293b;
            margin: 0.5rem 0;
        }

        .milestone-description {
            color: #64748b;
        }

        /* Blog Section */
        .blog-card {
            background: white;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 5px 20px rgba(0,0,0,0.08);
            transition: all 0.3s ease;
        }

        .blog-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(0,0,0,0.15);
        }

        .blog-image {
            height: 200px;
            background: var(--gradient-primary);
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 3rem;
        }

        .blog-content {
            padding: 1.5rem;
        }

        .blog-category {
            color: var(--primary-color);
            font-size: 0.85rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .blog-title {
            font-size: 1.1rem;
            font-weight: 600;
            color: #1e293b;
            margin: 0.5rem 0 1rem;
            line-height: 1.4;
        }

        .blog-excerpt {
            color: #64748b;
            font-size: 0.9rem;
            line-height: 1.5;
            margin-bottom: 1rem;
        }

        .blog-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.85rem;
            color: #94a3b8;
        }

        /* Footer */
        .footer {
            background: #1e293b;
            color: white;
            padding: 3rem 0 1rem;
        }

        .footer-title {
            font-weight: 700;
            margin-bottom: 1rem;
            color: #60a5fa;
        }

        .footer-link {
            color: #cbd5e1;
            text-decoration: none;
            transition: color 0.3s ease;
            display: block;
            margin-bottom: 0.5rem;
        }

        .footer-link:hover {
            color: white;
        }

        /* Dashboard Styles (from previous version) */
        .sidebar {
            position: fixed;
            left: 0;
            top: 0;
            height: 100vh;
            width: var(--sidebar-width);
            background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
            color: white;
            overflow-y: auto;
            z-index: 1000;
            transition: all 0.3s ease;
        }

        .sidebar-header {
            padding: 1.5rem;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .sidebar-header h4 {
            margin: 0;
            font-weight: 600;
            color: #60a5fa;
        }

        .nav-section {
            padding: 1rem 0;
        }

        .nav-section-title {
            padding: 0.5rem 1.5rem;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #94a3b8;
            margin-bottom: 0.5rem;
        }

        .sidebar .nav-link {
            display: flex;
            align-items: center;
            padding: 0.75rem 1.5rem;
            color: #cbd5e1;
            text-decoration: none;
            transition: all 0.2s ease;
            border-left: 3px solid transparent;
        }

        .sidebar .nav-link:hover {
            background-color: rgba(255,255,255,0.1);
            color: white;
            border-left-color: var(--accent-color);
        }

        .sidebar .nav-link::after {
            display: none;
        }

        .sidebar .nav-link.active {
            background-color: rgba(59, 130, 246, 0.1);
            color: #60a5fa;
            border-left-color: #60a5fa;
        }

        .sidebar .nav-link i {
            width: 20px;
            margin-right: 0.75rem;
            font-size: 1rem;
        }

        .main-content {
            margin-left: var(--sidebar-width);
            min-height: 100vh;
        }

        .topbar {
            background: white;
            padding: 1rem 2rem;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .content-area {
            padding: 2rem;
        }

        .dashboard-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }

        .dashboard-card {
            background: white;
            border-radius: 12px;
            padding: 1.5rem;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
            border: 1px solid #e2e8f0;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .dashboard-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 16px rgba(0,0,0,0.1);
        }

        .card-icon {
            width: 60px;
            height: 60px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            margin-bottom: 1rem;
        }

        .card-title {
            font-size: 1.1rem;
            font-weight: 600;
            color: #1e293b;
            margin-bottom: 0.5rem;
        }

        .card-subtitle {
            color: #64748b;
            font-size: 0.9rem;
        }

        .progress-indicator {
            margin-top: 1rem;
        }

        .progress-bar {
            height: 6px;
            border-radius: 3px;
        }

        .content-card {
            background: white;
            border-radius: 12px;
            padding: 2rem;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
            border: 1px solid #e2e8f0;
        }

        .breadcrumb {
            background: none;
            padding: 0;
            margin-bottom: 1rem;
        }

        .breadcrumb-item a {
            color: var(--primary-color);
            text-decoration: none;
        }

        .canvas-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
            margin: 1rem 0;
        }

        .canvas-box {
            border: 2px dashed #d1d5db;
            padding: 1rem;
            min-height: 120px;
            border-radius: 8px;
            background: #f9fafb;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            transition: all 0.2s ease;
        }

        .canvas-box:hover {
            border-color: var(--primary-color);
            background: #eff6ff;
        }

        .canvas-title {
            font-weight: 600;
            color: #374151;
            margin-bottom: 0.5rem;
            font-size: 0.9rem;
        }

        /* Modal Styles */
        .modal-content {
            border: none;
            border-radius: 15px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }

        .modal-header {
            border-bottom: 1px solid #e2e8f0;
            padding: 1.5rem;
        }

        .modal-title {
            font-weight: 700;
            color: #1e293b;
        }

        .form-control {
            border: 2px solid #e2e8f0;
            border-radius: 10px;
            padding: 0.75rem 1rem;
            transition: all 0.3s ease;
        }

        .form-control:focus {
            border-color: var(--primary-color);
            box-shadow: 0 0 0 0.2rem rgba(37, 99, 235, 0.25);
        }

        /* Responsive */
        @media (max-width: 768px) {
            .sidebar {
                transform: translateX(-100%);
            }
            
            .sidebar.active {
                transform: translateX(0);
            }
            
            .main-content {
                margin-left: 0;
            }
            
            .hero-title {
                font-size: 2.5rem;
            }
            
            .dashboard-cards {
                grid-template-columns: 1fr;
            }
        }

        /* Hide sections initially */
        .app-section {
            display: none;
        }

        .app-section.active {
            display: block;
        }

        .public-section.active {
            display: block;
        }
    </style>
</head>
<body>
    <!-- Public Navigation -->
    <nav class="navbar navbar-expand-lg public-navbar" id="publicNavbar">
        <div class="container">
            <a class="navbar-brand" href="#" onclick="showPublicSection('home')">
                <i class="fas fa-chart-line me-2"></i>StrategyPro
            </a>
            
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="#" onclick="showPublicSection('home')">Inicio</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" onclick="showPublicSection('about')">Quiénes Somos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" onclick="showPublicSection('milestones')">Hitos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" onclick="showPublicSection('blog')">Blog</a>
                    </li>
                </ul>
                
                <div class="d-flex gap-2">
                    <button class="btn btn-login" data-bs-toggle="modal" data-bs-target="#loginModal">
                        <i class="fas fa-sign-in-alt me-1"></i>Iniciar Sesión
                    </button>
                    <button class="btn btn-register" data-bs-toggle="modal" data-bs-target="#registerModal">
                        <i class="fas fa-user-plus me-1"></i>Registrarse
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <!-- Public Sections -->
    
    <!-- Home Section -->
    <div id="home-section" class="public-section active">
        <!-- Hero Section -->
        <section class="hero-section">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-6">
                        <div class="hero-content">
                            <h1 class="hero-title">Crea tu Plan de Negocio Profesional</h1>
                            <p class="hero-subtitle">
                                La plataforma más completa para desarrollar estrategias empresariales exitosas. 
                                Herramientas profesionales, templates listos y metodologías probadas.
                            </p>
                            <button class="btn btn-hero me-3" onclick="showAppDashboard()">
                                <i class="fas fa-rocket me-2"></i>Comenzar Ahora
                            </button>
                            <button class="btn btn-hero" onclick="showPublicSection('about')" style="background: transparent;">
                                <i class="fas fa-info-circle me-2"></i>Conocer Más
                            </button>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="text-center">
                            <i class="fas fa-chart-bar" style="font-size: 15rem; opacity: 0.1;"></i>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Features Section -->
        <section class="py-5" style="background: #f8fafc;">
            <div class="container">
                <div class="row">
                    <div class="col-12 text-center mb-5">
                        <h2 class="section-title">¿Por qué elegir StrategyPro?</h2>
                        <p class="section-subtitle">
                            Herramientas profesionales para crear planes de negocio exitosos
                        </p>
                    </div>
                </div>
                
                <div class="row g-4">
                    <div class="col-md-6 col-lg-4">
                        <div class="feature-card">
                            <div class="feature-icon" style="background: var(--gradient-primary);">
                                <i class="fas fa-chart-line"></i>
                            </div>
                            <h3 class="feature-title">Análisis Estratégico Completo</h3>
                            <p class="feature-description">
                                Herramientas como PESTEL, Porter, FODA y Canvas para un análisis profundo de tu negocio y el mercado.
                            </p>
                        </div>
                    </div>
                    
                    <div class="col-md-6 col-lg-4">
                        <div class="feature-card">
                            <div class="feature-icon" style="background: var(--gradient-secondary);">
                                <i class="fas fa-calculator"></i>
                            </div>
                            <h3 class="feature-title">Modelado Financiero</h3>
                            <p class="feature-description">
                                Proyecciones financieras, análisis de sensibilidad y escenarios para validar la viabilidad económica.
                            </p>
                        </div>
                    </div>
                    
                    <div class="col-md-6 col-lg-4">
                        <div class="feature-card">
                            <div class="feature-icon" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
                                <i class="fas fa-users"></i>
                            </div>
                            <h3 class="feature-title">Gestión Integral</h3>
                            <p class="feature-description">
                                Planificación de marketing, recursos humanos y operaciones en una sola plataforma integrada.
                            </p>
                        </div>
                    </div>
                    
                    <div class="col-md-6 col-lg-4">
                        <div class="feature-card">
                            <div class="feature-icon" style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);">
                                <i class="fas fa-file-export"></i>
                            </div>
                            <h3 class="feature-title">Reportes Profesionales</h3>
                            <p class="feature-description">
                                Exporta tu plan completo en PDF con diseño profesional para presentaciones e inversores.
                            </p>
                        </div>
                    </div>
                    
                    <div class="col-md-6 col-lg-4">
                        <div class="feature-card">
                            <div class="feature-icon" style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); color: #374151;">
                                <i class="fas fa-sync-alt"></i>
                            </div>
                            <h3 class="feature-title">Actualizaciones en Tiempo Real</h3>
                            <p class="feature-description">
                                Mantén tu plan actualizado con cambios automáticos y seguimiento de progreso en tiempo real.
                            </p>
                        </div>
                    </div>
                    
                    <div class="col-md-6 col-lg-4">
                        <div class="feature-card">
                            <div class="feature-icon" style="background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%); color: #374151;">
                                <i class="fas fa-headset"></i>
                            </div>
                            <h3 class="feature-title">Soporte Especializado</h3>
                            <p class="feature-description">
                                Equipo de consultores expertos para guiarte en cada paso de tu planificación estratégica.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>

    <!-- About Section -->
    <div id="about-section" class="public-section" style="display: none;">
        <div style="margin-top: 80px;">
            <section class="about-section">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <h2 class="section-title">Quiénes Somos</h2>
                            <p class="section-subtitle">
                                Expertos en estrategia empresarial comprometidos con tu éxito
                            </p>
                        </div>
                    </div>
                    
                    <div class="row align-items-center mb-5">
                        <div class="col-lg-6">
                            <div class="pe-lg-4">
                                <h3 class="mb-4" style="color: #1e293b; font-weight: 700;">Nuestra Misión</h3>
                                <p class="mb-4" style="color: #64748b; font-size: 1.1rem; line-height: 1.7;">
                                    Democratizar el acceso a herramientas profesionales de planificación estratégica, 
                                    permitiendo que emprendedores y empresas de todos los tamaños puedan crear 
                                    planes de negocio sólidos y bien fundamentados.
                                </p>
                                <p style="color: #64748b; font-size: 1.1rem; line-height: 1.7;">
                                    Creemos que toda gran idea merece un plan excepcional, y estamos aquí para 
                                    hacer que eso sea posible con tecnología de vanguardia y metodologías probadas.
                                </p>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="text-center">
                                <div style="background: var(--gradient-primary); border-radius: 20px; padding: 3rem; color: white;">
                                    <i class="fas fa-bullseye" style="font-size: 4rem; margin-bottom: 1rem;"></i>
                                    <h4>+10,000</h4>
                                    <p>Planes de negocio creados</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-md-4">
                            <div class="text-center p-4">
                                <div class="feature-icon mx-auto mb-3" style="background: var(--gradient-primary);">
                                    <i class="fas fa-graduation-cap"></i>
                                </div>
                                <h4 style="color: #1e293b;">Experiencia</h4>
                                <p style="color: #64748b;">
                                    Más de 15 años de experiencia en consultoría estratégica y desarrollo de negocios.
                                </p>
                            </div>
                        </div>
                        
                        <div class="col-md-4">
                            <div class="text-center p-4">
                                <div class="feature-icon mx-auto mb-3" style="background: var(--gradient-secondary);">
                                    <i class="fas fa-award"></i>
                                </div>
                                <h4 style="color: #1e293b;">Calidad</h4>
                                <p style="color: #64748b;">
                                    Metodologías probadas y herramientas validadas por las mejores escuelas de negocio.
                                </p>
                            </div>
                        </div>
                        
                        <div class="col-md-4">
                            <div class="text-center p-4">
                                <div class="feature-icon mx-auto mb-3" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
                                    <i class="fas fa-handshake"></i>
                                </div>
                                <h4 style="color: #1e293b;">Compromiso</h4>
                                <p style="color: #64748b;">
                                    Soporte continuo y actualizaciones constantes para mantener tu plan siempre relevante.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>

    <!-- Milestones Section -->
    <div id="milestones-section" class="public-section" style="display: none;">
        <div style="margin-top: 80px;">
            <section class="py-5">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <h2 class