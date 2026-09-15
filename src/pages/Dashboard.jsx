import { useState } from 'react';
import { useMsal } from "@azure/msal-react";

export default function Dashboard() {
    const { accounts } = useMsal();
    
    // Fallbacks en caso de que MSAL esté cargando o se esté probando localmente sin login
    const nombreUsuario = accounts[0]?.name?.toUpperCase() || 'DONNOVAN URRUTIA MUNILLA';
    const correoUsuario = accounts[0]?.username || 'do.urrutia@duocuc.cl';
    // En un caso real, los roles vienen en el ID Token (idTokenClaims.roles)
    const rolesUsuario = accounts[0]?.idTokenClaims?.roles?.join(', ') || 'Usuario Autorizado';

    const [apiResponse, setApiResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Simulación de petición segura al BFF / API Gateway
    const simularPeticionSegura = () => {
        setIsLoading(true);
        setApiResponse(null);
        
        // Simulamos el delay de red
        setTimeout(() => {
            setApiResponse({
                status: 200,
                message: 'Conexión exitosa con API Gateway',
                tokenValido: true,
                timestamp: new Date().toISOString()
            });
            setIsLoading(false);
        }, 1200);
    };

    return (
        <div style={{ position: 'relative' }}>
            {/* Banner Principal */}
            <div style={{ background: 'linear-gradient(135deg, #0f766e 0%, #0d9488 100%)', borderRadius: '16px', padding: '2.5rem', color: 'white', marginBottom: '2rem', boxShadow: '0 10px 15px -3px rgba(13, 148, 136, 0.2)' }}>
                <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Portal Médico Autorizado
                </span>
                <h1 style={{ margin: '1rem 0 0.5rem 0', fontSize: '2.2rem', letterSpacing: '0.5px' }}>
                    Bienvenido/a, {nombreUsuario}
                </h1>
                <p style={{ margin: 0, opacity: 0.9, fontSize: '1.05rem' }}>
                    Sistema unificado de gestión clínica y control de atenciones de la red.
                </p>
            </div>

            {/* Accesos Directos (Grid) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                {/* Card 1 */}
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.75rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ margin: '0 0 0.75rem 0', color: '#1e293b', fontSize: '1.15rem' }}>Gestión de Atenciones</h3>
                    <p style={{ margin: '0 0 1.5rem 0', color: '#64748b', fontSize: '0.95rem', lineHeight: '1.5', flexGrow: 1 }}>
                        Control de flujo, estados y asignación de boxes activos.
                    </p>
                    <a href="/reception" style={{ color: '#0f766e', fontWeight: '600', textDecoration: 'none', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        Ir a Atenciones →
                    </a>
                </div>

                {/* Card 2 */}
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.75rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ margin: '0 0 0.75rem 0', color: '#1e293b', fontSize: '1.15rem' }}>Catálogo de Prestaciones</h3>
                    <p style={{ margin: '0 0 1.5rem 0', color: '#64748b', fontSize: '0.95rem', lineHeight: '1.5', flexGrow: 1 }}>
                        Administración centralizada de servicios y valores.
                    </p>
                    <a href="/catalog" style={{ color: '#0f766e', fontWeight: '600', textDecoration: 'none', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        Ver Catálogo →
                    </a>
                </div>

                {/* Card 3 */}
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.75rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ margin: '0 0 0.75rem 0', color: '#1e293b', fontSize: '1.15rem' }}>Reportería y KPIs</h3>
                    <p style={{ margin: '0 0 1.5rem 0', color: '#64748b', fontSize: '0.95rem', lineHeight: '1.5', flexGrow: 1 }}>
                        Indicadores en tiempo real de demanda y ocupación.
                    </p>
                    <a href="/reports" style={{ color: '#0f766e', fontWeight: '600', textDecoration: 'none', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        Ver Reportes →
                    </a>
                </div>
            </div>

            {/* Información de Sesión */}
            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.75rem', marginBottom: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                <h3 style={{ margin: '0 0 1.25rem 0', color: '#1e293b', fontSize: '1.15rem' }}>Información de Sesión y Token</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
                    <div>
                        <span style={{ fontWeight: '600', color: '#334155', fontSize: '0.95rem' }}>Correo: </span>
                        <span style={{ color: '#64748b', fontSize: '0.95rem' }}>{correoUsuario}</span>
                    </div>
                    <div>
                        <span style={{ fontWeight: '600', color: '#334155', fontSize: '0.95rem' }}>Roles (Claims): </span>
                        <span style={{ color: '#64748b', fontSize: '0.95rem' }}>{rolesUsuario}</span>
                    </div>
                </div>
            </div>

            {/* Simulación API Gateway */}
            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.75rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                <h3 style={{ margin: '0 0 0.75rem 0', color: '#1e293b', fontSize: '1.15rem' }}>Simulación de Conectividad con API Gateway</h3>
                <p style={{ margin: '0 0 1.5rem 0', color: '#64748b', fontSize: '0.95rem' }}>
                    Valida la inyección automática del token Bearer hacia los microservicios.
                </p>
                
                <button 
                    onClick={simularPeticionSegura}
                    disabled={isLoading}
                    style={{ 
                        backgroundColor: isLoading ? '#94a3b8' : '#0f766e', 
                        color: 'white', 
                        border: 'none', 
                        padding: '0.75rem 1.5rem', 
                        borderRadius: '8px', 
                        fontWeight: '600', 
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        transition: 'background-color 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    {isLoading ? 'Conectando...' : 'Ejecutar Petición Segura'}
                </button>

                {/* Resultado de la simulación */}
                {apiResponse && (
                    <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', color: '#166534', fontSize: '0.9rem', fontFamily: 'monospace', animation: 'fadeIn 0.3s ease-in-out' }}>
                        <div><strong>Status:</strong> {apiResponse.status} OK</div>
                        <div><strong>Message:</strong> {apiResponse.message}</div>
                        <div><strong>Bearer Token:</strong> Validado por Spring Security</div>
                        <div style={{ fontSize: '0.8rem', color: '#15803d', marginTop: '0.5rem' }}>{apiResponse.timestamp}</div>
                    </div>
                )}
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-5px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}