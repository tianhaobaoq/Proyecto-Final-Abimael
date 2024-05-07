import React from 'react'

//Función que genera las preguntas y respuestas y su funcionalidad
function FAQ ({faq, index, toggleFAQ}) {
	return (
		<div
			className={"faq " + (faq.open ? 'open' : '')}
			key={index}
			onClick={() => toggleFAQ(index)}
		>
			<div className="faq-pregunta">
				{faq.pregunta}
			</div>
			<div className="faq-respuesta">
				{faq.respuesta}
			</div>
		</div>
	)
}

export default FAQ