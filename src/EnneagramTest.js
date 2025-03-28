import React, { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

const questions = [
  { text: "Procuro sempre fazer as coisas de forma correta e ética.", type: 1 },
  { text: "Gosto de ajudar os outros e frequentemente coloco suas necessidades à frente das minhas.", type: 2 },
  { text: "Sou ambicioso(a) e orientado(a) para o sucesso.", type: 3 },
  { text: "Sou sensível e frequentemente me sinto diferente dos outros.", type: 4 },
  { text: "Sou curioso(a) e gosto de acumular conhecimento sobre diversos assuntos.", type: 5 },
  { text: "Sou leal e valorizo muito a segurança em minhas relações.", type: 6 },
  { text: "Sou otimista e gosto de ter várias opções e experiências.", type: 7 },
  { text: "Sou forte e gosto de assumir o controle em situações difíceis.", type: 8 },
  { text: "Sou pacífico(a) e evito conflitos sempre que possível.", type: 9 },
  { text: "Tenho altos padrões e sou muito crítico(a) comigo mesmo(a).", type: 1 },
  { text: "Sou empático(a) e posso facilmente entender os sentimentos dos outros.", type: 2 },
  { text: "Sou competitivo(a) e gosto de me destacar.", type: 3 },
  { text: "Sou criativo(a) e frequentemente me expresso através da arte ou da emoção.", type: 4 },
  { text: "Prefiro observar e analisar antes de agir.", type: 5 },
  { text: "Sou cauteloso(a) e gosto de estar preparado(a) para possíveis problemas.", type: 6 },
  { text: "Sou espontâneo(a) e gosto de viver o momento presente.", type: 7 },
  { text: "Sou assertivo(a) e não tenho medo de enfrentar desafios.", type: 8 },
  { text: "Sou adaptável e frequentemente atuo como mediador(a) em conflitos.", type: 9 },
  { text: "Busco constantemente melhorar e aperfeiçoar as coisas ao meu redor.", type: 1 },
  { text: "Sinto-me realizado(a) quando posso fazer a diferença na vida dos outros.", type: 2 },
  { text: "Tenho dificuldade em relaxar até que tudo esteja perfeito.", type: 1 },
  { text: "Frequentemente ignoro minhas próprias necessidades para atender às dos outros.", type: 2 },
  { text: "Sinto-me desconfortável quando não estou sendo produtivo(a).", type: 3 },
  { text: "Tenho uma forte necessidade de ser único(a) e especial.", type: 4 },
  { text: "Prefiro trabalhar sozinho(a) a trabalhar em grupo.", type: 5 },
  { text: "Tenho dificuldade em confiar nas pessoas rapidamente.", type: 6 },
  { text: "Fico entediado(a) facilmente e sempre busco novas experiências.", type: 7 },
  { text: "Tenho dificuldade em mostrar vulnerabilidade.", type: 8 },
  { text: "Às vezes tenho dificuldade em tomar decisões.", type: 9 },
  { text: "Sou muito organizado(a) e gosto de seguir regras e procedimentos.", type: 1 }
];

const EnneagramTest = () => {
  const [answers, setAnswers] = useState(Array(30).fill(3));
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({});

  const handleAnswer = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const calculateResults = () => {
    const scores = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0};
    questions.forEach((q, index) => {
      scores[q.type] += answers[index];
    });
    const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    setResults(sortedScores);
    setShowResults(true);
  };

  const resetTest = () => {
    setAnswers(Array(30).fill(3));
    setShowResults(false);
    setResults({});
  };

  const typeDescriptions = {
    1: "O Perfeccionista",
    2: "O Ajudante",
    3: "O Realizador",
    4: "O Individualista",
    5: "O Investigador",
    6: "O Leal",
    7: "O Entusiasta",
    8: "O Desafiador",
    9: "O Pacificador"
  };

  const chartData = Object.entries(typeDescriptions).map(([type, name]) => ({
    subject: `Tipo ${type}`,
    A: results[type] ? results[type][1] : 0,
    fullMark: 20,
  }));

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white text-black">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold">Botconex</h1>
        <h2 className="text-xl">Automações Digitais com Inteligência Artificial</h2>
      </div>
      <h1 className="text-3xl font-bold mb-6 text-center">Teste de Eneagrama</h1>
      
      {!showResults ? (
        <>
          <p className="mb-4">Para cada afirmação, escolha um número de 1 (discordo totalmente) a 5 (concordo totalmente) que melhor descreve você:</p>
          {questions.map((q, index) => (
            <div key={index} className="mb-4 p-4 bg-gray-100 rounded">
              <p className="mb-2">{q.text}</p>
              <div className="flex justify-between">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    onClick={() => handleAnswer(index, value)}
                    className={`px-4 py-2 rounded ${
                      answers[index] === value ? 'bg-black text-white' : 'bg-gray-300'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={calculateResults}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors"
          >
            Ver Resultados
          </button>
        </>
      ) : (
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-2xl font-bold mb-4">Seus Resultados:</h2>
          <div className="mb-6">
            <p className="font-bold">Seu tipo principal de Eneagrama é provavelmente:</p>
            <p className="text-xl mt-2">
              Tipo {results[0][0]}: {typeDescriptions[results[0][0]]} (Pontuação: {results[0][1]})
            </p>
            
            <p className="font-bold mt-4">Tipos secundários:</p>
            <ul className="mt-2">
              {results.slice(1, 3).map((result, index) => (
                <li key={index} className="mt-1">
                  Tipo {result[0]}: {typeDescriptions[result[0]]} (Pontuação: {result[1]})
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full h-80 my-6">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart outerRadius="80%" data={chartData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <Radar
                  name="Pontuação"
                  dataKey="A"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2">Todas as pontuações:</h3>
            <div className="grid grid-cols-3 gap-4">
              {results.map((result, index) => (
                <div key={index} className="p-2 bg-white rounded shadow">
                  <p>
                    <span className="font-bold">Tipo {result[0]}:</span> {typeDescriptions[result[0]]}
                  </p>
                  <p>Pontuação: {result[1]}</p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={resetTest}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors"
          >
            Refazer o Teste
          </button>
        </div>
      )}
      <div className="mt-8 pt-4 border-t text-center text-gray-600">
        <p>® 2025 - Botconex - Todos os direitos reservados</p>
      </div>
    </div>
  );
};

export default EnneagramTest;
