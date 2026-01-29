const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Regístrate",
      desc: "Crea tu cuenta de usuario para acceder al panel de soporte técnico."
    },
    {
      id: 2,
      title: "Reporta tu Problema",
      desc: "Completa el formulario indicando el fallo, la prioridad y una descripción clara."
    },
    {
      id: 3,
      title: "Resolución",
      desc: "Nuestros técnicos asignados trabajarán en tu caso hasta cerrarlo con éxito."
    }
  ];

  return (
    <div className="py-5">
      <h2 className="text-center mb-5 fw-bold" style={{ color: '#2c3e50' }}>¿Cómo funciona el sistema?</h2>
      <div className="row text-center">
        {steps.map((step) => (
          <div key={step.id} className="col-md-4 mb-4">
            <div className="p-4 rounded-circle bg-primary text-white d-inline-block mb-3" style={{ width: '60px', height: '60px', lineHeight: '30px', fontSize: '1.5rem', fontWeight: 'bold' }}>
              {step.id}
            </div>
            <h4>{step.title}</h4>
            <p className="text-muted">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;