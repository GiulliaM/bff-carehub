/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.6.22-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: carehub
-- ------------------------------------------------------
-- Server version	10.6.22-MariaDB-ubu2004

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `artigos`
--

DROP TABLE IF EXISTS `artigos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `artigos` (
  `artigo_id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(300) NOT NULL,
  `subtitulo` varchar(500) DEFAULT NULL,
  `conteudo` text NOT NULL,
  `categoria` varchar(100) DEFAULT NULL,
  `autor_id` int(11) DEFAULT NULL,
  `imagem_url` varchar(500) DEFAULT NULL,
  `visualizacoes` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `fonte_url` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`artigo_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artigos`
--

LOCK TABLES `artigos` WRITE;
/*!40000 ALTER TABLE `artigos` DISABLE KEYS */;
INSERT INTO `artigos` VALUES (1,'Como Comunicar-se com Quem Tem Alzheimer','Técnicas simples que reduzem a agitação e fortalecem o vínculo afetivo','A comunicação com pessoas que têm Alzheimer exige paciência e criatividade. À medida que a doença avança, as palavras se tornam difíceis, mas a necessidade de conexão emocional permanece intacta.\n\nUse frases curtas e simples. Em vez de \"O que você quer comer no almoço?\", prefira \"Você quer arroz ou macarrão?\". Perguntas abertas geram ansiedade; perguntas com duas opções facilitam a resposta.\n\nFale devagar, com voz calma e tom gentil. O tom emocional é compreendido mesmo quando as palavras não são. Um sorriso, um toque suave na mão ou um abraço dizem mais do que qualquer frase complexa.\n\nEvite corrigir ou contradizer. Se a pessoa disser algo que não corresponde à realidade, não discuta. Valide o sentimento por trás da fala: \"Parece que você está com saudade\" é mais eficaz do que qualquer correção.\n\nMantenha contato visual. Posicione-se na mesma altura, olhe nos olhos e elimine distrações ao redor antes de iniciar uma conversa importante — desligue a TV, reduza o barulho.\n\nDê tempo para processar. Após fazer uma pergunta, espere. Pode levar até 30 segundos para a resposta chegar. Não repita imediatamente; aguarde e reformule com outras palavras se necessário.\n\nUse fotos e músicas conhecidas. Álbuns de família e músicas favoritas estimulam a memória afetiva e abrem janelas de comunicação surpreendentes.\n\nLembre-se: por trás da doença ainda está a mesma pessoa com sua história e necessidade de amor. A qualidade da comunicação impacta diretamente o bem-estar e o comportamento do paciente.','Alzheimer',NULL,NULL,0,'2026-05-18 17:35:20','https://www.abraz.org.br/alzheimer/como-tratar/comunicacao'),(2,'Adaptando a Casa para Quem Tem Alzheimer','Mudanças simples no ambiente doméstico que aumentam a segurança e reduzem a confusão','O ambiente físico pode ser um aliado poderoso no cuidado de pessoas com Alzheimer. Pequenas adaptações reduzem riscos de acidentes, diminuem a confusão e favorecem a autonomia possível.\n\nReduza a confusão visual. Retire objetos em excesso das bancadas e mesas. Ambientes muito cheios dificultam a orientação espacial. Prefira superfícies limpas com apenas o essencial.\n\nUse sinalizações visuais. Etiquetas com fotos nos armários (foto de pratos, foto de roupas) ajudam a pessoa a encontrar o que precisa sem depender de perguntas. Setas no chão podem indicar o caminho para o banheiro.\n\nInstale travas de segurança. Fogão, produtos de limpeza e medicamentos precisam ser inacessíveis. Travas simples em armários baixos são suficientes para a maioria dos casos.\n\nIlumine bem todos os ambientes. A percepção visual piora com o Alzheimer. Sombras e penumbra geram medo e desorientação. Luzes de presença no caminho do quarto ao banheiro são essenciais.\n\nRetire tapetes soltos e objetos no chão. Quedas são a principal causa de hospitalização em idosos com demência. Tapetes antiderrapantes fixos podem ficar; tapetes soltos devem ser retirados.\n\nInstale barras de apoio no banheiro. Ao lado do vaso sanitário e dentro do box, barras de aço inoxidável evitam quedas e dão segurança para que a pessoa se levante e sente com mais independência.\n\nConsidere alarme de saída. Em fases avançadas, o risco de a pessoa sair de casa e se perder é real. Alarmes simples na porta e pulseiras com GPS trazem tranquilidade ao cuidador.','Alzheimer',NULL,NULL,0,'2026-05-18 17:35:20','https://www.abraz.org.br/alzheimer/como-tratar'),(3,'Alimentação Saudável para Idosos: O Guia Essencial','Nutrientes indispensáveis e como garantir uma dieta equilibrada na terceira idade','Com o envelhecimento, o organismo passa por mudanças que afetam diretamente a absorção de nutrientes e as necessidades alimentares. Uma alimentação adequada é fundamental para manter a energia, a imunidade e a qualidade de vida.\n\nProteínas são essenciais para preservar a massa muscular, que diminui naturalmente com a idade. Inclua ovos, frango, peixe, leguminosas (feijão, lentilha, grão-de-bico) e laticínios nas refeições diárias. A recomendação é de 1,0 a 1,2g de proteína por kg de peso corporal por dia.\n\nCálcio e vitamina D protegem os ossos. Leite, iogurte, queijo, sardinha e vegetais verde-escuros são boas fontes de cálcio. A vitamina D é produzida pela exposição solar — 15 a 20 minutos de sol pela manhã, sem protetor nas partes do corpo (não no rosto), já fazem diferença.\n\nFibras regulam o intestino e controlam o colesterol. Frutas com casca, aveia, verduras cruas e legumes devem estar presentes em todas as refeições. Um intestino funcionando bem melhora o humor e previne infecções.\n\nHidratação é frequentemente negligenciada. Idosos têm menor sensação de sede, mas as necessidades de água não diminuem. Ofereça água, água de coco, chás e sucos naturais ao longo do dia — não espere a pessoa pedir.\n\nEvite ultraprocessados: embutidos, biscoitos recheados, refrigerantes e refeições prontas são ricos em sódio, gordura trans e açúcar, aumentando o risco de hipertensão, diabetes e inflamações.\n\nDivida as refeições em 5 a 6 porções menores ao longo do dia. O estômago dos idosos tem menor capacidade, e refeições menores e mais frequentes melhoram a digestão e o aproveitamento dos nutrientes.','Nutrição',NULL,NULL,0,'2026-05-18 17:35:20','https://www.sbgg.org.br/publico/nutricao-do-idoso'),(4,'Disfagia: Como Ajudar Quem Tem Dificuldade para Engolir','Adaptações na textura dos alimentos e técnicas seguras para evitar engasgos e pneumonia aspirativa','A disfagia — dificuldade para engolir — é comum em idosos, especialmente após AVC, com Parkinson ou Alzheimer avançado. Sem manejo adequado, pode causar engasgos, desnutrição e pneumonia por aspiração, uma das principais causas de internação e morte nessa população.\n\nSinais de alerta: tosse durante ou após as refeições, voz molhada ou rouca depois de comer, engasgos frequentes, refeições que demoram mais de 30 minutos, perda de peso sem causa aparente. Se observar esses sinais, comunique o médico e busque avaliação com fonoaudióloga.\n\nPosicionamento correto é fundamental. A pessoa deve estar sentada ereta, com o tronco em ângulo de 90° e o queixo levemente inclinado para baixo (não para cima) durante toda a refeição. Nunca alimente alguém deitado.\n\nAdapte as texturas conforme orientação profissional. Para líquidos, use espessantes (maizena ou produtos industriais como Resource ThickenUp) para atingir consistência de néctar ou mel. Para sólidos, prefira purês, cremes e alimentos macios. Evite alimentos que se separam na boca (arroz seco, carne fibrosa).\n\nOfereça pequenas quantidades. Use colher de chá (5ml) e aguarde a deglutição completa antes da próxima. Nunca apresse a refeição.\n\nMantenha a pessoa sentada por pelo menos 30 minutos após comer. Isso reduz o risco de refluxo e aspiração.\n\nCuide da higiene bucal rigorosamente. A boca é reservatório de bactérias que, se aspiradas, causam pneumonia grave. Escove os dentes e a língua após cada refeição.','Nutrição',NULL,NULL,0,'2026-05-18 17:35:20','https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/d/disfagia'),(5,'Organizando os Medicamentos com Segurança','Como criar uma rotina de administração que evita erros, esquecimentos e trocas perigosas','Erros com medicamentos são uma das principais causas de internações evitáveis em idosos. Com um sistema simples de organização, é possível garantir que a pessoa certa tome o remédio certo, na dose certa, no horário certo.\n\nUse um organizador semanal de comprimidos. Esses porta-medicamentos com compartimentos por dia e horário (manhã, tarde, noite) reduzem drasticamente o risco de esquecimento ou duplicação. Prepare-os sempre na mesma hora da semana.\n\nMonte uma lista mestre de medicamentos. Inclua: nome do remédio, para que serve, dose, horário, e se deve ser tomado com ou sem alimento. Mantenha essa lista atualizada e leve uma cópia para todas as consultas médicas.\n\nNunca troque os medicamentos de embalagem. Guardar remédios em outros frascos causa erros graves. Cada medicamento deve ficar em sua embalagem original, com a bula.\n\nVerifique as interações com alimentos. Alguns remédios não devem ser tomados com suco de toranja (grapefruit), leite ou café. Leia a bula ou pergunte ao farmacêutico sobre cada um.\n\nDescarte medicamentos vencidos corretamente. Leve a farmácias que participam do programa de logística reversa de medicamentos. Nunca jogue no lixo comum ou no vaso sanitário.\n\nAtenção ao horário. Medicamentos para pressão são mais eficazes pela manhã; diuréticos devem ser tomados cedo para não interromper o sono. Siga sempre as orientações do médico sobre o melhor horário de cada remédio.\n\nUse o CareHub para registrar os horários e marcar cada dose como tomada. O histórico de doses ajuda o médico a avaliar a adesão ao tratamento nas consultas.','Medicamentos',NULL,NULL,0,'2026-05-18 17:35:20','https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/m/medicamentos'),(6,'Polimedicação: Quando o Idoso Usa Muitos Remédios','Entenda os riscos das interações medicamentosas e o papel do cuidador na vigilância','Polimedicação é o uso simultâneo de cinco ou mais medicamentos. Ela é comum entre idosos com múltiplas doenças crônicas, mas aumenta significativamente o risco de reações adversas, interações perigosas, quedas e internações hospitalares.\n\nPor que é um problema? O organismo do idoso metaboliza os remédios de forma mais lenta. O que seria uma dose segura para um adulto jovem pode se acumular e causar toxicidade em um idoso. Além disso, cada medicamento adicional multiplica as possibilidades de interação.\n\nSinais de que algo pode estar errado: confusão mental súbita, tontura ao levantar, quedas frequentes, perda de apetite, fraqueza incomum, alterações no sono ou no humor. Esses sintomas muitas vezes são efeitos colaterais de medicamentos, não \"parte do envelhecimento\".\n\nO papel do cuidador é fundamental: leve a lista completa de medicamentos a TODAS as consultas, inclusive ao dentista e ao pronto-socorro. Inclua suplementos, vitaminas e chás — muitos têm interações importantes com remédios prescritos.\n\nPeça uma revisão anual da medicação. Existe um processo chamado \"desprescrição\", onde o médico avalia se todos os medicamentos ainda são necessários. Às vezes remédios são mantidos por inércia, quando já não fazem sentido.\n\nNão interrompa nenhum medicamento sem orientação médica. Mesmo que a pessoa diga que não quer tomar, ou que \"não sente diferença\", a suspensão abrupta de alguns remédios pode causar crises graves.\n\nNunca compartilhe medicamentos entre pacientes. O remédio certo para uma pessoa pode ser perigoso para outra, mesmo com o mesmo diagnóstico.','Medicamentos',NULL,NULL,0,'2026-05-18 17:35:20','https://www.sbgg.org.br/publico/polifarmacia'),(7,'Prevenção de Quedas: Como Adaptar a Casa','Barras de apoio, tapetes, iluminação e outras mudanças que reduzem o risco de quedas e fraturas','Quedas são a principal causa de lesões graves e hospitalizações em idosos. Uma fratura de quadril, por exemplo, pode levar a uma cascata de complicações que compromete definitivamente a independência do paciente. A boa notícia: a maioria das quedas é prevenível com adaptações simples no ambiente.\n\nBanheiro é o local de maior risco. Instale barras de apoio ao lado do vaso sanitário, dentro e fora do box. Use tapetes antiderrapantes com ventosas. Troque o box por uma entrada rasa ou elimine o degrau de acesso.\n\nRetire todos os tapetes soltos. São a principal causa de tropeços. Se quiser tapetes, use apenas os com fita antiderrapante por baixo e bem fixos no chão.\n\nIlumine bem todos os caminhos noturnos. Instale luzes de presença automáticas no corredor, no banheiro e na cozinha. O idoso que acorda à noite para ir ao banheiro está em estado de sonolência e com reflexos reduzidos.\n\nOrganize a mobília para criar caminhos livres. Retire mesas de centro com cantos vivos, fios no chão e móveis baixos que possam ser usados como apoio mas não suportam o peso.\n\nEscolha calçados adequados. Chinelos abertos, meias sem sola antiderrapante e sapatos com solado liso aumentam o risco de quedas. O ideal são sapatos fechados com velcro (sem cadarço) e solado de borracha.\n\nConsidere barras de apoio na cama e na sala. Uma barra ao lado da cama ajuda a pessoa a se levantar com segurança. Na sala, certifique-se de que a cadeira e o sofá têm altura adequada para que a pessoa consiga sentar e levantar sem esforço excessivo.\n\nAvalie a visão regularmente. Óculos inadequados ou catarata não tratada comprometem a percepção do ambiente e aumentam o risco de quedas.','Mobilidade',NULL,NULL,0,'2026-05-18 17:35:20','https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/q/quedas-em-idosos'),(8,'Exercícios Seguros para Idosos com Mobilidade Reduzida','Movimentos simples que mantêm a força, o equilíbrio e a independência sem risco de lesões','A atividade física é um dos pilares mais importantes da saúde na terceira idade. Mesmo com mobilidade reduzida, exercícios adaptados preservam a massa muscular, melhoram o equilíbrio, reduzem o risco de quedas e elevam o humor.\n\nCaminhada é o ponto de partida ideal. Para quem tem mobilidade preservada, 20 a 30 minutos de caminhada leve, 3 a 5 vezes por semana, já trazem benefícios significativos para coração, ossos e humor. Comece com 10 minutos e aumente gradualmente.\n\nExercícios sentados para quem não consegue caminhar. Com a pessoa sentada em uma cadeira firme, sem braços: elevar e abaixar os pés alternadamente (10 repetições), abrir e fechar as mãos (10 vezes), erguer os braços à altura dos ombros e baixar devagar (10 vezes). Esses movimentos simples ativam a circulação e trabalham os principais grupos musculares.\n\nExercícios de equilíbrio reduzem quedas. Fique em pé atrás de uma cadeira firme (para apoio), levante um pé do chão por 10 segundos, troque de lado. Repita 5 vezes cada. Com o tempo, aumente para 20 segundos.\n\nFisioterapia domiciliar é altamente recomendada. Um fisioterapeuta pode criar um programa individualizado, adaptado às limitações específicas da pessoa, e ensinar o cuidador a realizar os exercícios corretamente.\n\nAtenção aos sinais de alerta durante o exercício: dor no peito, falta de ar desproporcional, tontura ou dor articular intensa são motivos para parar imediatamente e consultar o médico.\n\nNunca force movimentos além da amplitude de movimento confortável. O objetivo é manter e melhorar gradualmente, não causar dor.','Mobilidade',NULL,NULL,0,'2026-05-18 17:35:20','https://www.coffito.gov.br/nsite/?p=14084'),(9,'Burnout do Cuidador: Reconhecendo os Sinais e Pedindo Ajuda','Cuidar de si mesmo não é egoísmo — é condição essencial para continuar cuidando do outro','Cuidar de uma pessoa dependente é uma das tarefas mais nobres e exigentes que existem. Mas sem suporte adequado, o cuidador frequentemente ultrapassa seus limites e entra em colapso — um estado conhecido como burnout do cuidador ou síndrome do esgotamento do cuidador.\n\nSinais de alerta: irritabilidade crescente com a pessoa que você cuida ou com familiares próximos; sensação de que o cuidado \"nunca acaba\" e de que não há saída; choro frequente sem motivo aparente; isolamento social progressivo; descaso com a própria saúde (alimentação, sono, consultas médicas); sentimentos de culpa ou ressentimento.\n\nPor que isso acontece? O cuidador muitas vezes assume toda a responsabilidade sozinho, abre mão de suas atividades pessoais e profissionais, e não reconhece seus próprios limites. A sociedade ainda não valoriza adequadamente o trabalho do cuidador, tornando-o invisível.\n\nO que fazer: divida as responsabilidades com outros familiares, mesmo que seja de forma parcial. Não existe \"cuidador único perfeito\". Aceite ajuda quando oferecida. Estabeleça ao menos um período por semana de descanso real — algumas horas em que outra pessoa cuida.\n\nBusque grupos de apoio. Associações como a ABRAz (para cuidadores de pessoas com Alzheimer) e grupos em hospitais oferecem espaços de escuta onde você pode falar com pessoas que entendem sua realidade.\n\nProcure suporte psicológico. Terapia individual ajuda a processar emoções difíceis, como a antecipação do luto, a raiva e o sentimento de culpa. Muitos CAPS e UBS oferecem esse serviço gratuitamente.\n\nLembre-se: você não pode dar o que não tem. Cuidar da sua saúde é cuidar do paciente.','Bem-estar',NULL,NULL,0,'2026-05-18 17:35:20','https://www.paho.org/pt/topicos/saude-mental'),(10,'Estimulação Cognitiva para Idosos: Atividades que Fazem Diferença','Jogos, conversas e rotinas que mantêm a mente ativa e retardam o declínio cognitivo','O cérebro é um órgão que precisa ser exercitado. Estudos mostram que a estimulação cognitiva regular pode retardar o declínio da memória e até reduzir o risco de demência. E o melhor: as atividades mais eficazes são simples e podem ser feitas em casa.\n\nLeitura e relatos de vida. Ler em voz alta para a pessoa, ou pedir que ela conte histórias da vida dela, ativa múltiplas áreas cerebrais ao mesmo tempo. Pergunte sobre a infância, o trabalho, os filhos — cada memória relembrada fortalece conexões neurais.\n\nJogos e passatempos. Palavras cruzadas, caça-palavras, dominó, baralho, xadrez e quebra-cabeça desafiam a memória, a atenção e o raciocínio lógico. Adapte a dificuldade ao nível atual da pessoa — o objetivo é estimular, não frustrar.\n\nMúsica. Cantar músicas conhecidas é uma das atividades mais poderosas para pessoas com demência. A memória musical é preservada mesmo em estágios avançados de Alzheimer. Crie playlists com as músicas favoritas da pessoa e cante junto.\n\nAtividades manuais. Dobrar roupas, montar colagens, pintar com guache, amassar massa de modelar ou jardinar em vasos são atividades que estimulam a coordenação motora fina e trazem sensação de utilidade e pertencimento.\n\nRotina estável reduz a ansiedade e melhora o funcionamento cognitivo. Acorde, almoce e durma nos mesmos horários. Isso dá previsibilidade ao cérebro e reduz a confusão em pessoas com comprometimento cognitivo.\n\nConvívio social é neuroprotetor. Visitas de familiares, conversas por videochamada e participação em grupos de convivência (quando possível) são tão importantes quanto qualquer exercício mental formal.','Bem-estar',NULL,NULL,0,'2026-05-18 17:35:20','https://www.sbgg.org.br/publico/atividade-cognitiva'),(11,'Cuidados com os Pés do Paciente Diabético','Como inspecionar, higienizar e proteger os pés para evitar complicações que podem levar à amputação','O pé diabético é uma das complicações mais graves e frequentes do diabetes. A combinação de neuropatia (perda de sensibilidade) e problemas circulatórios faz com que pequenas feridas nos pés passem despercebidas e evoluam para infecções graves. A inspeção diária é a medida preventiva mais importante.\n\nInspecione os pés todos os dias. Com boa iluminação, examine a sola, entre os dedos, calcanhares e unhas. Procure: cortes, bolhas, calosidades, vermelhidão, inchaço ou unhas encravadas. Use um espelho com cabo se a pessoa não conseguir dobrar para ver a sola.\n\nLave e seque completamente os pés. Lave com água morna (teste a temperatura com o cotovelo, nunca com os pés — pode haver perda de sensibilidade) e sabão neutro. Seque com cuidado, especialmente entre os dedos — a umidade favorece fungos.\n\nHidrate, mas não entre os dedos. Use creme hidratante neutro na sola e no dorso do pé, mas nunca entre os dedos. Evite vaselina, que não é absorvida.\n\nCorte as unhas retas. Nunca em curva. Nunca tente remover calos ou unhas encravadas em casa — isso é serviço de podólogo especializado em pé diabético.\n\nCalçados adequados são essenciais. Meias sem costura, sapatos fechados com biqueira larga e solado firme. Nunca ande descalço, nem dentro de casa.\n\nNunca use bolsas de água quente, almofadas elétricas ou saunas nos pés. A perda de sensibilidade impede que a pessoa perceba queimaduras.\n\nQualquer ferida que não cicatrize em 24 horas deve ser avaliada por médico. Não espere piorar.','Diabetes',NULL,NULL,0,'2026-05-18 17:35:20','https://www.diabetes.org.br/publico/diabetes-tipo-2/complicacoes/pe-diabetico'),(12,'Hipoglicemia: Reconheça os Sinais e Saiba Agir','O que fazer quando a glicemia cai — um guia rápido e prático para cuidadores','Hipoglicemia é a queda da glicemia (açúcar no sangue) abaixo de 70 mg/dL. Em idosos com diabetes, pode ser mais frequente e mais perigosa do que em adultos jovens, pois os sinais de alerta são menos evidentes e a recuperação é mais lenta.\n\nSinais de hipoglicemia leve a moderada: tremores, suor frio, palidez, coração acelerado, fome intensa, fraqueza, irritabilidade, confusão mental. A pessoa pode parecer \"estranha\" ou agitada sem motivo aparente.\n\nO que fazer imediatamente: se a pessoa estiver consciente e conseguir engolir, ofereça uma das seguintes opções (escolha apenas uma — não misture):\n• 1 copo (200ml) de suco de laranja ou outra fruta\n• 3 a 4 balas de glicose (encontradas em farmácias)\n• 1 colher de sopa de mel ou açúcar dissolvido em água\n• 1 lata de refrigerante comum (não diet)\n\nAguarde 15 minutos e verifique a glicemia novamente. Se ainda estiver baixa, repita. Se melhorar, ofereça um lanche com carboidrato complexo (biscoito, pão) para estabilizar.\n\nSinais de hipoglicemia grave: a pessoa perde a consciência, tem convulsões ou não consegue engolir. Nesse caso, NUNCA tente dar comida ou líquido pela boca. Ligue para o SAMU (192) imediatamente e posicione a pessoa de lado (posição lateral de segurança).\n\nGlicagon injectable: se o médico prescreveu, aprenda a aplicar. É um hormônio que eleva a glicemia rapidamente em emergências.\n\nRegistre o episódio e informe o médico. Hipoglicemias frequentes indicam que o esquema de medicamentos ou insulina precisa ser revisado.','Diabetes',NULL,NULL,0,'2026-05-18 17:35:20','https://www.diabetes.org.br/publico/diabetes-tipo-2/complicacoes/hipoglicemia'),(13,'Como Medir a Pressão Arterial em Casa','Guia passo a passo para uma aferição correta e confiável — evitando erros comuns','Medir a pressão em casa é uma ferramenta valiosa para o controle da hipertensão. Mas erros na técnica podem gerar leituras incorretas que levam a decisões equivocadas sobre medicamentos. Siga esse protocolo para garantir leituras confiáveis.\n\nEquipamento correto. Use um aparelho digital automático de braço (não de pulso — são menos precisos). Verifique se o manguito é do tamanho certo para o braço da pessoa: deve cobrir 80% da circunferência do braço.\n\nPrepare a pessoa corretamente. Evite cafeína (café, chá preto, refrigerante com cola) e cigarro por pelo menos 30 minutos antes. Não meça após exercício físico. A bexiga deve estar vazia. Aguarde 5 minutos de repouso sentada antes de iniciar.\n\nPosicionamento correto:\n• Pessoa sentada, costas apoiadas, pés no chão (não cruzados)\n• Braço apoiado em uma superfície plana na altura do coração\n• Manguito posicionado 2 a 3 cm acima da dobra do cotovelo\n• Braço relaxado, não segurando nada\n\nMeça duas vezes com intervalo de 1 a 2 minutos. Use a média das duas leituras. Se a diferença for maior que 10 mmHg, meça uma terceira vez.\n\nRegistre sempre: data, hora e os dois valores (pressão sistólica/diastólica). Anote também se a pessoa tomou o medicamento antes ou depois da medição.\n\nValores de referência gerais (consulte sempre o médico para os alvos individuais): abaixo de 130/80 mmHg é o objetivo para a maioria dos adultos. Valores acima de 180/120 mmHg exigem avaliação médica urgente.\n\nNunca ajuste a dose do medicamento por conta própria baseado em uma única leitura alta ou baixa.','Hipertensão',NULL,NULL,0,'2026-05-18 17:35:20','https://www.cardiol.br/para-o-publico/doencas/hipertensao-arterial'),(14,'Alimentação e Pressão Alta: O que Comer e o que Evitar','Estratégias nutricionais baseadas em evidências para ajudar no controle da hipertensão','A alimentação tem papel fundamental no controle da pressão arterial. Estudos mostram que mudanças na dieta podem reduzir a pressão sistólica em até 11 mmHg — equivalente ao efeito de alguns medicamentos anti-hipertensivos.\n\nReduza o sal. A principal medida alimentar. O brasileiro consome em média 12g de sal por dia; o recomendado é no máximo 5g. Tire o saleiro da mesa, use ervas aromáticas (alecrim, tomilho, orégano, limão) para temperar, e leia os rótulos — embutidos, enlatados e temperos prontos são fontes ocultas de sódio.\n\nAumente o potássio. O potássio atua como antagonista do sódio e ajuda a dilatar os vasos sanguíneos. Fontes ricas: banana, batata doce, abacate, feijão, espinafre, tomate e laranja. Atenção: quem tem doença renal deve consultar o médico antes de aumentar o potássio.\n\nInclua laticínios com baixo teor de gordura. O cálcio e o magnésio do leite e iogurte desnatados contribuem para a regulação da pressão. Consuma 2 a 3 porções por dia.\n\nAposte nos peixes. Sardinha, atum, salmão e cavalinha são ricos em ômega-3, que tem efeito anti-inflamatório e melhora a elasticidade dos vasos. Inclua peixe 2 a 3 vezes por semana.\n\nEvite álcool. Mesmo doses moderadas elevam a pressão sistólica e reduzem a eficácia dos medicamentos anti-hipertensivos.\n\nControle o peso. Cada quilo perdido representa uma redução média de 1 mmHg na pressão sistólica. Não precisa atingir o peso ideal — pequenas perdas já trazem benefícios.\n\nA dieta DASH (Dietary Approaches to Stop Hypertension) é a mais recomendada para hipertensos. Prioriza frutas, vegetais, grãos integrais, laticínios magros e proteínas magras.','Hipertensão',NULL,NULL,0,'2026-05-18 17:35:20','https://www.cardiol.br/para-o-publico/doencas/hipertensao-arterial/hipertensao-e-alimentacao'),(15,'O Que São Cuidados Paliativos: Guia para Famílias','Entenda essa abordagem humanizada que prioriza conforto, qualidade de vida e dignidade','Cuidados paliativos são frequentemente mal compreendidos. Não significam \"desistir\" ou \"deixar morrer\" — pelo contrário. É uma abordagem de cuidado que busca aliviar o sofrimento, controlar os sintomas e melhorar a qualidade de vida de pacientes com doenças graves, independentemente do estágio da doença.\n\nQuando os cuidados paliativos começam? O ideal é que comecem desde o diagnóstico de uma doença grave — câncer, insuficiência cardíaca avançada, DPOC, Alzheimer em estágio severo — e sejam intensificados ao longo do tempo conforme necessário. Não são exclusivos do fim de vida.\n\nO que a equipe paliativa faz: controla a dor e outros sintomas (falta de ar, náusea, ansiedade); apoia emocionalmente o paciente e a família; ajuda nas conversas difíceis sobre o que a pessoa quer para os momentos finais; coordena o cuidado entre todos os especialistas envolvidos.\n\nDiretiva antecipada de vontade (DAV). É um documento legal no qual a pessoa registra seus desejos sobre tratamentos médicos caso fique inconsciente ou incapaz de se expressar. Inclui questões como: quer ser reanimada? Quer ser intubada? Quer ficar em casa ou no hospital? Conversar sobre isso com antecedência evita angústia e conflitos na família.\n\nCuidado domiciliar vs. hospitalar. Muitas pessoas com doenças avançadas preferem morrer em casa, entre pessoas amadas. Equipes de cuidado paliativo domiciliar (disponíveis em muitas cidades pelo SUS) tornam isso possível com segurança e qualidade.\n\nO luto começa antes da perda. Familiares frequentemente vivenciam o luto antecipado — tristeza, raiva, culpa — ainda com o ente querido vivo. Buscar apoio psicológico durante esse período é fundamental.','Cuidados Paliativos',NULL,NULL,0,'2026-05-18 17:35:20','https://www.ancp.org.br/o-que-sao-cuidados-paliativos'),(16,'Garantindo Conforto e Dignidade no Fim da Vida','Aspectos práticos e emocionais dos cuidados nos momentos finais — o que você pode fazer','Os momentos finais da vida de uma pessoa querida são ao mesmo tempo dos mais difíceis e dos mais preciosos. Com informação e apoio, é possível garantir que essa fase seja vivida com conforto, dignidade e afeto.\n\nControle da dor é prioridade absoluta. Nenhuma pessoa deve sofrer dor intensa nos momentos finais por falta de medicamento adequado. A morfina e outros opioides, quando bem prescritos e monitorados, são seguros e eficazes. Não deixe que o medo de \"viciar\" ou \"apressar o fim\" impeça o uso de analgesia adequada.\n\nSinais físicos de que a morte está próxima (dias a horas): respiração irregular com períodos de apneia (respiração de Cheyne-Stokes), extremidades frias e arroxeadas, pele manchada (livedo), dificuldade de engolir, perda da consciência progressiva. Esses são sinais naturais — não são sofrimento, e não exigem intervenção médica de urgência.\n\nO que você pode fazer: mantenha a boca hidratada com bolinhas de gaze úmida ou spray labial. Posicione a pessoa confortavelmente de lado para facilitar a respiração. Fale com ela — a audição é o último sentido a se perder. Diga o que precisa dizer.\n\nAmbiente: luz suave, temperatura agradável, silêncio ou músicas suaves que a pessoa apreciava. A presença de pessoas amadas é mais reconfortante do que qualquer intervenção médica.\n\nApós a morte: respire. Chore. Não há pressa. Você não precisa ligar para o hospital imediatamente — ligue para o médico que acompanhava a pessoa para a declaração de óbito, quando estiver pronto.\n\nCuide do seu luto. A perda de quem você cuidou é intensa, especialmente quando o cuidado durou anos. Procure apoio — grupos, terapia, família. Você fez o que podia. Com amor.','Cuidados Paliativos',NULL,NULL,0,'2026-05-18 17:35:20','https://www.ancp.org.br/cuidados-paliativos-para-familias');
/*!40000 ALTER TABLE `artigos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `convites_vinculo`
--

DROP TABLE IF EXISTS `convites_vinculo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `convites_vinculo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `paciente_id` int(11) NOT NULL,
  `criado_por` int(11) NOT NULL,
  `codigo` char(6) NOT NULL,
  `expira_em` datetime NOT NULL,
  `usado` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `criado_por` (`criado_por`),
  KEY `idx_convites_codigo` (`codigo`),
  KEY `idx_convites_paciente` (`paciente_id`),
  CONSTRAINT `convites_vinculo_ibfk_1` FOREIGN KEY (`paciente_id`) REFERENCES `pacientes` (`paciente_id`) ON DELETE CASCADE,
  CONSTRAINT `convites_vinculo_ibfk_2` FOREIGN KEY (`criado_por`) REFERENCES `usuarios` (`usuario_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `convites_vinculo`
--

LOCK TABLES `convites_vinculo` WRITE;
/*!40000 ALTER TABLE `convites_vinculo` DISABLE KEYS */;
/*!40000 ALTER TABLE `convites_vinculo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diario_itens`
--

DROP TABLE IF EXISTS `diario_itens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `diario_itens` (
  `item_id` int(11) NOT NULL AUTO_INCREMENT,
  `registro_id` int(11) NOT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `descricao` text NOT NULL,
  PRIMARY KEY (`item_id`),
  KEY `registro_id` (`registro_id`),
  CONSTRAINT `diario_itens_ibfk_1` FOREIGN KEY (`registro_id`) REFERENCES `diario_registros` (`registro_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diario_itens`
--

LOCK TABLES `diario_itens` WRITE;
/*!40000 ALTER TABLE `diario_itens` DISABLE KEYS */;
/*!40000 ALTER TABLE `diario_itens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diario_registros`
--

DROP TABLE IF EXISTS `diario_registros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `diario_registros` (
  `registro_id` int(11) NOT NULL AUTO_INCREMENT,
  `data` date DEFAULT NULL,
  `hora` time DEFAULT NULL,
  `atividades` text DEFAULT NULL,
  `comentario` text DEFAULT NULL,
  `paciente_id` int(11) DEFAULT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`registro_id`),
  KEY `idx_diario_paciente` (`paciente_id`),
  KEY `idx_diario_usuario` (`usuario_id`),
  KEY `idx_diario_registro_usuario` (`registro_id`,`usuario_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diario_registros`
--

LOCK TABLES `diario_registros` WRITE;
/*!40000 ALTER TABLE `diario_registros` DISABLE KEYS */;
/*!40000 ALTER TABLE `diario_registros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grupo_cuidado`
--

DROP TABLE IF EXISTS `grupo_cuidado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `grupo_cuidado` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) NOT NULL,
  `paciente_id` int(11) NOT NULL,
  `papel` enum('dono','cuidador','familiar') NOT NULL DEFAULT 'cuidador',
  `status` enum('Ativo','Inativo') NOT NULL DEFAULT 'Ativo',
  `parentesco` varchar(100) DEFAULT NULL,
  `data_vinculo` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_vinculo` (`usuario_id`,`paciente_id`),
  KEY `paciente_id` (`paciente_id`),
  CONSTRAINT `grupo_cuidado_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`) ON DELETE CASCADE,
  CONSTRAINT `grupo_cuidado_ibfk_2` FOREIGN KEY (`paciente_id`) REFERENCES `pacientes` (`paciente_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grupo_cuidado`
--

LOCK TABLES `grupo_cuidado` WRITE;
/*!40000 ALTER TABLE `grupo_cuidado` DISABLE KEYS */;
/*!40000 ALTER TABLE `grupo_cuidado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grupo_cuidado_responsaveis`
--

DROP TABLE IF EXISTS `grupo_cuidado_responsaveis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `grupo_cuidado_responsaveis` (
  `tarefa_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  PRIMARY KEY (`tarefa_id`,`usuario_id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `grupo_cuidado_responsaveis_ibfk_1` FOREIGN KEY (`tarefa_id`) REFERENCES `tarefas` (`tarefa_id`) ON DELETE CASCADE,
  CONSTRAINT `grupo_cuidado_responsaveis_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grupo_cuidado_responsaveis`
--

LOCK TABLES `grupo_cuidado_responsaveis` WRITE;
/*!40000 ALTER TABLE `grupo_cuidado_responsaveis` DISABLE KEYS */;
/*!40000 ALTER TABLE `grupo_cuidado_responsaveis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historico_medico`
--

DROP TABLE IF EXISTS `historico_medico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `historico_medico` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `paciente_id` int(11) NOT NULL,
  `condicoes_cronicas` text DEFAULT NULL,
  `alergias` text DEFAULT NULL,
  `historico_cirurgico` text DEFAULT NULL,
  `tipo_sanguineo` varchar(10) DEFAULT NULL,
  `plano_saude_nome` varchar(200) DEFAULT NULL,
  `plano_saude_numero` varchar(100) DEFAULT NULL,
  `contatos_emergencia` text DEFAULT NULL,
  `medico_responsavel` varchar(200) DEFAULT NULL,
  `telefone_medico` varchar(30) DEFAULT NULL,
  `capacidade_funcional` text DEFAULT NULL,
  `observacoes_gerais` text DEFAULT NULL,
  `ultima_alteracao_por` int(11) DEFAULT NULL,
  `ultima_alteracao_em` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `paciente_id` (`paciente_id`),
  KEY `ultima_alteracao_por` (`ultima_alteracao_por`),
  KEY `idx_historico_medico_paciente` (`paciente_id`),
  CONSTRAINT `historico_medico_ibfk_1` FOREIGN KEY (`paciente_id`) REFERENCES `pacientes` (`paciente_id`) ON DELETE CASCADE,
  CONSTRAINT `historico_medico_ibfk_2` FOREIGN KEY (`ultima_alteracao_por`) REFERENCES `usuarios` (`usuario_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historico_medico`
--

LOCK TABLES `historico_medico` WRITE;
/*!40000 ALTER TABLE `historico_medico` DISABLE KEYS */;
/*!40000 ALTER TABLE `historico_medico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicamento_doses`
--

DROP TABLE IF EXISTS `medicamento_doses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `medicamento_doses` (
  `dose_id` int(11) NOT NULL AUTO_INCREMENT,
  `medicamento_id` int(11) NOT NULL,
  `data` date NOT NULL,
  `horario` varchar(10) NOT NULL,
  `tomado` tinyint(1) DEFAULT 0,
  `hora_tomada` datetime DEFAULT NULL,
  PRIMARY KEY (`dose_id`),
  UNIQUE KEY `unique_dose` (`medicamento_id`,`data`,`horario`),
  CONSTRAINT `medicamento_doses_ibfk_1` FOREIGN KEY (`medicamento_id`) REFERENCES `medicamentos` (`medicamento_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicamento_doses`
--

LOCK TABLES `medicamento_doses` WRITE;
/*!40000 ALTER TABLE `medicamento_doses` DISABLE KEYS */;
/*!40000 ALTER TABLE `medicamento_doses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicamentos`
--

DROP TABLE IF EXISTS `medicamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `medicamentos` (
  `medicamento_id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `dosagem` varchar(100) DEFAULT NULL,
  `horarios` text DEFAULT NULL,
  `concluido` tinyint(1) DEFAULT 0,
  `inicio` date DEFAULT NULL,
  `duracao_days` int(11) DEFAULT NULL,
  `uso_continuo` tinyint(1) DEFAULT 0,
  `paciente_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `mg` varchar(50) DEFAULT NULL,
  `qtd_comprimidos` decimal(5,2) DEFAULT NULL,
  `hora_conclusao` datetime DEFAULT NULL,
  `tipo_agendamento` varchar(50) DEFAULT 'horarios',
  `intervalo_horas` int(11) DEFAULT NULL,
  `data_fim` date DEFAULT NULL,
  `dias_semana` varchar(50) DEFAULT NULL,
  `grupo_repeticao` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`medicamento_id`),
  KEY `idx_medicamentos_paciente` (`paciente_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicamentos`
--

LOCK TABLES `medicamentos` WRITE;
/*!40000 ALTER TABLE `medicamentos` DISABLE KEYS */;
INSERT INTO `medicamentos` VALUES (1,'Donepezila','10mg','[\"07:00\"]',0,'2025-01-10',NULL,1,1,'2026-06-21 15:24:00','10',1.00,NULL,'horarios',NULL,NULL,NULL,NULL),(2,'Sertralina','50mg','[\"08:00\"]',0,'2025-03-01',NULL,1,1,'2026-06-21 15:24:00','50',1.00,NULL,'horarios',NULL,NULL,NULL,NULL),(3,'Omeprazol','20mg','[\"07:00\"]',0,'2025-01-10',NULL,1,1,'2026-06-21 15:24:00','20',1.00,NULL,'horarios',NULL,NULL,NULL,NULL),(4,'Memantina','10mg','[\"12:00\",\"20:00\"]',0,'2025-06-01',NULL,1,1,'2026-06-21 15:24:00','10',1.00,NULL,'horarios',NULL,NULL,NULL,NULL),(5,'Metformina','850mg','[\"07:30\",\"19:30\"]',0,'2020-08-15',NULL,1,2,'2026-06-21 15:24:00','850',1.00,NULL,'horarios',NULL,NULL,NULL,NULL),(6,'Losartana','50mg','[\"07:30\"]',0,'2020-08-15',NULL,1,2,'2026-06-21 15:24:00','50',1.00,NULL,'horarios',NULL,NULL,NULL,NULL),(7,'AAS','100mg','[\"12:00\"]',0,'2021-11-20',NULL,1,2,'2026-06-21 15:24:00','100',1.00,NULL,'horarios',NULL,NULL,NULL,NULL),(8,'Glibenclamida','5mg','[\"07:30\",\"19:30\"]',0,'2022-02-10',NULL,1,2,'2026-06-21 15:24:00','5',1.00,NULL,'horarios',NULL,NULL,NULL,NULL),(9,'Enalapril','10mg','[\"08:00\",\"20:00\"]',0,'2019-05-03',NULL,1,3,'2026-06-21 15:24:00','10',1.00,NULL,'horarios',NULL,NULL,NULL,NULL),(10,'Sinvastatina','20mg','[\"21:00\"]',0,'2020-01-15',NULL,1,3,'2026-06-21 15:24:00','20',1.00,NULL,'horarios',NULL,NULL,NULL,NULL),(11,'Calcio + Vit D','600mg','[\"12:00\"]',0,'2023-09-01',NULL,1,3,'2026-06-21 15:24:00','600',1.00,NULL,'horarios',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `medicamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pacientes`
--

DROP TABLE IF EXISTS `pacientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `pacientes` (
  `paciente_id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(200) NOT NULL,
  `idade` int(11) DEFAULT NULL,
  `genero` varchar(50) DEFAULT NULL,
  `observacoes` text DEFAULT NULL,
  `criado_por` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `data_nascimento` date DEFAULT NULL,
  `tipo_sanguineo` varchar(10) DEFAULT NULL,
  `peso_kg` decimal(5,2) DEFAULT NULL,
  `altura_cm` decimal(5,2) DEFAULT NULL,
  `restricoes_alimentares` text DEFAULT NULL,
  `mobilidade` varchar(100) DEFAULT NULL,
  `plano_saude_nome` varchar(200) DEFAULT NULL,
  `plano_saude_numero` varchar(100) DEFAULT NULL,
  `responsavel_legal` varchar(200) DEFAULT NULL,
  `telefone_contato` varchar(20) DEFAULT NULL,
  `categorias_cuidado` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`categorias_cuidado`)),
  `observacoes_rotina` text DEFAULT NULL,
  PRIMARY KEY (`paciente_id`),
  KEY `idx_pacientes_fk_usuario` (`criado_por`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pacientes`
--

LOCK TABLES `pacientes` WRITE;
/*!40000 ALTER TABLE `pacientes` DISABLE KEYS */;
INSERT INTO `pacientes` VALUES (1,'Maria Aparecida Lima',78,'Feminino','Portadora de Alzheimer em estágio moderado. Necessita supervisão contínua.',1,'2026-06-21 15:24:00','1947-03-12','A+',62.50,158.00,NULL,'Limitada — usa andador','Unimed','00348821','Ana Paula Lima','(11) 98765-4321','[\"Alzheimer\",\"Medicamentos\",\"Higiene Pessoal\"]','Acorda às 7h. Toma café às 7h30. Almoço ao meio-dia. Soneca das 13h às 14h30. Jantar às 18h30. Dorme às 21h.'),(2,'José Roberto Lima',82,'Masculino','Diabético tipo 2 e hipertenso. Histórico de AVC leve em 2021.',1,'2026-06-21 15:24:00','1943-09-05','O+',74.00,172.00,NULL,'Parcial — bengala','Bradesco Saúde','88712-C','Ana Paula Lima','(11) 98765-4321','[\"Diabetes\",\"Hipertensão\",\"Mobilidade\"]','Verificar glicemia antes do café e do almoço. Caminhada leve no quintal às 16h quando bem disposto.'),(3,'Conceição Mendes',74,'Feminino','Hipertensa controlada. Cirurgia de quadril em 2023. Boa evolução na fisioterapia.',2,'2026-06-21 15:24:00','1951-11-28','B+',68.00,155.00,NULL,'Independente com apoio ocasional','SulAmérica','77241-X','Carlos Eduardo Mendes','(11) 97654-3210','[\"Hipertensão\",\"Fisioterapia\",\"Bem-estar\"]','Fisioterapia às terças e quintas às 9h. Prefere banho pela manhã às 8h30.');
/*!40000 ALTER TABLE `pacientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `perfil_cuidadores`
--

DROP TABLE IF EXISTS `perfil_cuidadores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `perfil_cuidadores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) NOT NULL,
  `bio` text DEFAULT NULL,
  `especialidades` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Array de tags: ["Alzheimer", "Mobilidade Reduzida", etc.]' CHECK (json_valid(`especialidades`)),
  `preco_hora` decimal(10,2) DEFAULT NULL,
  `cidade` varchar(100) DEFAULT NULL,
  `bairro` varchar(100) DEFAULT NULL,
  `foto_url` varchar(500) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `cpf` varchar(14) DEFAULT NULL,
  `status` enum('pendente','aprovado','rejeitado') NOT NULL DEFAULT 'pendente',
  `motivo_rejeicao` text DEFAULT NULL,
  `disponivel_busca` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario_id` (`usuario_id`),
  KEY `idx_perfil_cuidadores_usuario` (`usuario_id`),
  KEY `idx_perfil_cuidadores_disponivel` (`disponivel_busca`),
  KEY `idx_perfil_cuidadores_cidade` (`cidade`),
  KEY `idx_perfil_cuidadores_bairro` (`bairro`),
  CONSTRAINT `perfil_cuidadores_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perfil_cuidadores`
--

LOCK TABLES `perfil_cuidadores` WRITE;
/*!40000 ALTER TABLE `perfil_cuidadores` DISABLE KEYS */;
/*!40000 ALTER TABLE `perfil_cuidadores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tarefas`
--

DROP TABLE IF EXISTS `tarefas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `tarefas` (
  `tarefa_id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `descricao` text DEFAULT NULL,
  `data` date DEFAULT NULL,
  `hora` time DEFAULT NULL,
  `concluida` tinyint(1) DEFAULT 0,
  `paciente_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `criado_por` int(11) DEFAULT NULL,
  `atualizado_em` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`tarefa_id`),
  KEY `idx_tarefas_paciente` (`paciente_id`),
  KEY `idx_tarefas_data` (`data`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tarefas`
--

LOCK TABLES `tarefas` WRITE;
/*!40000 ALTER TABLE `tarefas` DISABLE KEYS */;
INSERT INTO `tarefas` VALUES (1,'Banho assistido','Auxiliar no banho. Atenção à temperatura da água e segurança.','2026-06-21','08:00:00',0,1,'2026-06-21 15:24:00',1,'2026-06-21 15:24:00'),(2,'Verificar medicamentos','Confirmar Donepezila e Omeprazol do café.','2026-06-21','07:30:00',0,1,'2026-06-21 15:24:00',1,'2026-06-21 15:24:00'),(3,'Exercícios de memória','Atividade com fotos da família por 20 min.','2026-06-22','10:00:00',0,1,'2026-06-21 15:24:00',1,'2026-06-21 15:24:00'),(4,'Banho assistido','Auxiliar no banho. Atenção à temperatura da água e segurança.','2026-06-22','08:00:00',0,1,'2026-06-21 15:24:00',1,'2026-06-21 15:24:00'),(5,'Verificar medicamentos','Confirmar Donepezila e Omeprazol do café.','2026-06-23','07:30:00',0,1,'2026-06-21 15:24:00',1,'2026-06-21 15:24:00'),(6,'Consulta neurologista','Dr. Marcos Ribeiro — Av. Paulista 1234, sala 87.','2026-06-24','14:30:00',0,1,'2026-06-21 15:24:00',1,'2026-06-21 15:24:00'),(7,'Passeio no quintal','Caminhada curta de 10 min com andador.','2026-06-25','09:00:00',0,1,'2026-06-21 15:24:00',1,'2026-06-21 15:24:00'),(8,'Medir glicemia','Antes do café. Anotar no caderno de controle.','2026-06-21','07:00:00',0,2,'2026-06-21 15:24:00',1,'2026-06-21 15:24:00'),(9,'Medir pressão','Aparelho do braço esquerdo. Registrar os dois valores.','2026-06-21','07:15:00',0,2,'2026-06-21 15:24:00',1,'2026-06-21 15:24:00'),(10,'Medir glicemia (almoço)','Antes do almoço.','2026-06-21','11:30:00',0,2,'2026-06-21 15:24:00',1,'2026-06-21 15:24:00'),(11,'Medir glicemia','Antes do café. Anotar no caderno de controle.','2026-06-22','07:00:00',0,2,'2026-06-21 15:24:00',1,'2026-06-21 15:24:00'),(12,'Medir pressão','Aparelho do braço esquerdo. Registrar os dois valores.','2026-06-22','07:15:00',0,2,'2026-06-21 15:24:00',1,'2026-06-21 15:24:00'),(13,'Caminhada leve','Quintal ou corredor. 10 minutos no seu ritmo.','2026-06-23','16:00:00',0,2,'2026-06-21 15:24:00',1,'2026-06-21 15:24:00'),(14,'Consulta endocrinologista','Dra. Luciana Prado — Rua Augusta 890. Levar caderno de glicemia.','2026-06-26','10:00:00',0,2,'2026-06-21 15:24:00',1,'2026-06-21 15:24:00'),(15,'Medir pressão','Registrar antes do jantar.','2026-06-21','18:00:00',0,3,'2026-06-21 15:24:00',2,'2026-06-21 15:24:00'),(16,'Exercícios domiciliares','Série de exercícios da fisioterapeuta. 3 séries de 10 repetições.','2026-06-21','10:00:00',0,3,'2026-06-21 15:24:00',2,'2026-06-21 15:24:00'),(17,'Medir pressão','Registrar antes do jantar.','2026-06-22','18:00:00',0,3,'2026-06-21 15:24:00',2,'2026-06-21 15:24:00'),(18,'Fisioterapia','Clínica Renova — Rua das Flores 45. Levar meia de compressão.','2026-06-24','09:00:00',0,3,'2026-06-21 15:24:00',2,'2026-06-21 15:24:00'),(19,'Consulta cardiologista','Dr. Paulo Saraiva — Hospital São Lucas, bloco B.','2026-06-25','11:00:00',0,3,'2026-06-21 15:24:00',2,'2026-06-21 15:24:00'),(20,'Fisioterapia','Clínica Renova — Rua das Flores 45. Levar meia de compressão.','2026-06-26','09:00:00',0,3,'2026-06-21 15:24:00',2,'2026-06-21 15:24:00');
/*!40000 ALTER TABLE `tarefas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `usuario_id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(200) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha_hash` varchar(255) NOT NULL,
  `tipo` enum('familiar','cuidador','admin') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `push_token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`usuario_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Ana Paula Lima','ana.lima@email.com','$2b$10$.J8nQ/AyX..rnMfDCxkWe.jDvSCmcteEmG1L7pfStDVnGia.JBg/6','familiar','2026-06-21 15:24:00',NULL),(2,'Carlos Eduardo Mendes','carlos.mendes@email.com','$2b$10$.J8nQ/AyX..rnMfDCxkWe.jDvSCmcteEmG1L7pfStDVnGia.JBg/6','familiar','2026-06-21 15:24:00',NULL),(3,'Fernanda Costa','fernanda.costa@email.com','$2b$10$.J8nQ/AyX..rnMfDCxkWe.jDvSCmcteEmG1L7pfStDVnGia.JBg/6','cuidador','2026-06-21 15:24:00',NULL),(4,'Roberto Alves','roberto.alves@email.com','$2b$10$.J8nQ/AyX..rnMfDCxkWe.jDvSCmcteEmG1L7pfStDVnGia.JBg/6','cuidador','2026-06-21 15:24:00',NULL);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacinas`
--

DROP TABLE IF EXISTS `vacinas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacinas` (
  `vacina_id` int(11) NOT NULL AUTO_INCREMENT,
  `paciente_id` int(11) NOT NULL,
  `nome_vacina` varchar(200) NOT NULL,
  `data_administracao` date DEFAULT NULL,
  `lote` varchar(100) DEFAULT NULL,
  `observacoes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`vacina_id`),
  KEY `paciente_id` (`paciente_id`),
  CONSTRAINT `vacinas_ibfk_1` FOREIGN KEY (`paciente_id`) REFERENCES `pacientes` (`paciente_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacinas`
--

LOCK TABLES `vacinas` WRITE;
/*!40000 ALTER TABLE `vacinas` DISABLE KEYS */;
/*!40000 ALTER TABLE `vacinas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vinculos_cuidador_paciente`
--

DROP TABLE IF EXISTS `vinculos_cuidador_paciente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `vinculos_cuidador_paciente` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cuidador_id` int(11) NOT NULL,
  `paciente_id` int(11) NOT NULL,
  `data_vinculo` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('Ativo','Pendente','Encerrado') DEFAULT 'Ativo',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_cuidador_paciente` (`cuidador_id`,`paciente_id`),
  KEY `idx_vinculos_cuidador` (`cuidador_id`),
  KEY `idx_vinculos_paciente` (`paciente_id`),
  CONSTRAINT `vinculos_cuidador_paciente_ibfk_1` FOREIGN KEY (`cuidador_id`) REFERENCES `usuarios` (`usuario_id`) ON DELETE CASCADE,
  CONSTRAINT `vinculos_cuidador_paciente_ibfk_2` FOREIGN KEY (`paciente_id`) REFERENCES `pacientes` (`paciente_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vinculos_cuidador_paciente`
--

LOCK TABLES `vinculos_cuidador_paciente` WRITE;
/*!40000 ALTER TABLE `vinculos_cuidador_paciente` DISABLE KEYS */;
INSERT INTO `vinculos_cuidador_paciente` VALUES (1,3,1,'2026-06-21 15:24:00','Ativo'),(2,3,2,'2026-06-21 15:24:00','Ativo'),(3,4,3,'2026-06-21 15:24:00','Ativo');
/*!40000 ALTER TABLE `vinculos_cuidador_paciente` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-21 17:27:12
