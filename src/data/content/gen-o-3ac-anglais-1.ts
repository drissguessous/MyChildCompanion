import type { Chapter } from '../types';

export const GEN_O_3AC_ANGLAIS_1: Chapter[] = [
  {
    id: '3AC-anglais-o1', levelId: '3AC', subjectId: 'anglais', title: 'Unit 1: Tell me about your summer!', lang: 'en',
    objectives: ['Talk about past experiences and summer holidays', 'Use the past simple (regular and irregular verbs)', 'Describe reading habits'],
    lesson: [
      { type: 'h', text: 'Talking about the past: the past simple' },
      { type: 'rule', text: 'Past simple: regular verbs add -ed (visit → visited, play → played, study → studied). Irregular verbs have their own form (go → went, see → saw, read → read, have → had). Negative: didn\'t + base verb. Question: Did + subject + base verb?' },
      { type: 'example', text: 'Last summer, Salma visited her grandparents in Chefchaouen. She didn\'t go to the beach. Did she read a lot? Yes, she did. She read three novels.' },
      { type: 'list', items: ['Time markers: yesterday, last summer, last week, two months ago, in 2025', 'Reading habits: How often do you read? I read every day / once a week / rarely.', 'Kinds of books: novels, comics, magazines, biographies'] },
      { type: 'p', text: 'To ask about someone\'s summer, use: Where did you go? What did you do? Did you enjoy it? How was it?' },
      { type: 'tip', text: 'Make a small list of irregular verbs and learn five a day: you will soon know them all!' },
    ],
    exercises: [
      { id: 'q1', type: 'qcm', prompt: 'Last August, we ___ to Essaouira.', choices: ['go', 'went', 'goed'], answer: 1, explanation: '"Go" is irregular: its past simple is "went".' },
      { id: 'q2', type: 'text', prompt: 'Write the past simple of "study".', accept: ['studied'], explanation: 'Consonant + y → -ied: study → studied.' },
      { id: 'q3', type: 'qcm', prompt: 'Choose the correct negative: "Youssef ___ the museum."', choices: ['didn\'t visited', 'not visited', 'didn\'t visit'], answer: 2, explanation: 'After "didn\'t" we use the base verb: didn\'t visit.' },
      { id: 'q4', type: 'tf', prompt: 'True or false: "Did you swam in the sea?" is correct.', answer: false, explanation: 'False. After "Did" we use the base verb: "Did you swim in the sea?"' },
      { id: 'q5', type: 'open', prompt: 'Write 3 sentences about your last summer holiday.', modelAnswer: 'Last summer, I went to Agadir with my family. We swam in the sea every morning. I also read two comics and enjoyed it a lot.', explanation: 'Use the past simple and time markers; check that irregular verbs are correct.' },
    ],
  },
  {
    id: '3AC-anglais-o2', levelId: '3AC', subjectId: 'anglais', title: 'Unit 3: Let\'s celebrate!', lang: 'en',
    objectives: ['Make, accept and decline invitations', 'Talk about festivals in Morocco', 'Use "would like to" and "be going to"'],
    lesson: [
      { type: 'h', text: 'Invitations and celebrations' },
      { type: 'list', items: ['Inviting: Would you like to come to my party? / Do you want to join us?', 'Accepting: I\'d love to! / Yes, sure. Thank you!', 'Declining politely: I\'m sorry, I can\'t. I\'m going to visit my aunt.'] },
      { type: 'rule', text: 'Would like to + base verb expresses a polite wish or invitation: "I would (I\'d) like to go." Be going to + base verb expresses a plan or intention: "We are going to celebrate Eid with our family."' },
      { type: 'example', text: 'Rania: Would you like to come to the Rose Festival in Kelaat M\'Gouna? Amine: I\'d love to! What are we going to do there? Rania: We\'re going to watch the parade.' },
      { type: 'p', text: 'Celebrate Morocco! Moroccans celebrate religious feasts (Eid al-Fitr, Eid al-Adha), national days (Throne Day, Independence Day on November 18th) and many local festivals, such as the Rose Festival or the Gnaoua Festival in Essaouira.' },
      { type: 'tip', text: 'Declining an invitation is fine: just say thank you and give a short reason. Politeness makes everyone happy!' },
    ],
    exercises: [
      { id: 'q1', type: 'qcm', prompt: 'Would you like ___ to my birthday party?', choices: ['to come', 'come', 'coming'], answer: 0, explanation: '"Would like" is followed by "to" + base verb.' },
      { id: 'q2', type: 'qcm', prompt: 'Next week, they ___ visit the Gnaoua Festival.', choices: ['is going to', 'are going to', 'going to'], answer: 1, explanation: '"They" takes "are": they are going to visit.' },
      { id: 'q3', type: 'tf', prompt: 'True or false: "I\'m sorry, I can\'t. I have an exam." is a polite way to decline an invitation.', answer: true, explanation: 'True: an apology plus a reason is polite.' },
      { id: 'q4', type: 'text', prompt: 'Complete: "I\'d love ___!" (to accept an invitation)', accept: ['to', 'to!'], explanation: '"I\'d love to!" is a common way to accept.' },
      { id: 'q5', type: 'qcm', prompt: 'Which sentence expresses a plan?', choices: ['I like parties.', 'I liked the party.', 'I\'m going to decorate the house.'], answer: 2, explanation: '"Be going to" expresses a plan or intention.' },
    ],
  },
  {
    id: '3AC-anglais-o3', levelId: '3AC', subjectId: 'anglais', title: 'Unit 4: They changed the world!', lang: 'en',
    objectives: ['Talk about inventions and technology', 'Use "used to" for past habits', 'Use sequencing words'],
    lesson: [
      { type: 'h', text: 'Then and now' },
      { type: 'rule', text: 'Used to + base verb describes past habits or situations that are not true now. Negative: didn\'t use to. Question: Did ... use to ...?' },
      { type: 'example', text: 'People used to write letters; now they send messages. My grandfather didn\'t use to have a mobile phone. Did you use to watch cartoons?' },
      { type: 'list', items: ['Sequencing words: first, then, next, after that, finally', 'Example: First, Bell studied sound. Then, he worked on his invention. Finally, he made the first telephone call in 1876.'] },
      { type: 'p', text: 'Technology vocabulary: invention, inventor, invent, device, the Internet, smartphone, computer, electricity.' },
      { type: 'tip', text: 'Ask a grandparent what life used to be like: it is great practice and a lovely conversation!' },
    ],
    exercises: [
      { id: 'q1', type: 'qcm', prompt: 'People ___ use candles before electricity.', choices: ['use to', 'used to', 'using to'], answer: 1, explanation: 'Affirmative past habit: used to + base verb.' },
      { id: 'q2', type: 'qcm', prompt: 'Choose the correct question.', choices: ['Did you use to play outside?', 'Did you used to play outside?', 'Do you used to play outside?'], answer: 0, explanation: 'After "Did", "use" loses the -d: Did you use to...?' },
      { id: 'q3', type: 'text', prompt: 'Which sequencing word comes last: first, then, finally?', accept: ['finally'], explanation: '"Finally" introduces the last step.' },
      { id: 'q4', type: 'tf', prompt: 'True or false: "used to" can describe a habit that still continues today.', answer: false, explanation: 'False: "used to" refers to the past only; for present habits we use the present simple.' },
      { id: 'q5', type: 'text', prompt: 'Complete with the noun: A person who invents things is an ___.', accept: ['inventor'], explanation: 'invent (verb) → invention (thing) → inventor (person).' },
    ],
  },
  {
    id: '3AC-anglais-o4', levelId: '3AC', subjectId: 'anglais', title: 'Unit 5: The future is ours!', lang: 'en',
    objectives: ['Talk about ambitions and careers', 'Give advice with "should" and "ought to"', 'Use the first conditional'],
    lesson: [
      { type: 'h', text: 'Ambitions and careers' },
      { type: 'list', items: ['Careers: doctor, engineer, teacher, pilot, journalist, farmer, programmer', 'Ambitions: I want to be an engineer. I hope to work abroad. My dream is to become a pilot.'] },
      { type: 'rule', text: 'Advice: should / ought to + base verb. "You should study hard." "You ought to read more." Negative: shouldn\'t (You shouldn\'t give up).' },
      { type: 'rule', text: 'First conditional (real possibility in the future): If + present simple, will + base verb. "If I work hard, I will pass my exam."' },
      { type: 'example', text: 'Hamza wants to be a doctor. His teacher says: "You should learn biology well. If you keep trying, you will reach your goal."' },
      { type: 'tip', text: 'Every big dream starts with a small step: write your ambition down and one thing you can do this week!' },
    ],
    exercises: [
      { id: 'q1', type: 'qcm', prompt: 'If it rains tomorrow, we ___ at home.', choices: ['will stay', 'stayed', 'stays'], answer: 0, explanation: 'First conditional: If + present, will + base verb.' },
      { id: 'q2', type: 'qcm', prompt: 'You ought ___ more water.', choices: ['drink', 'drinking', 'to drink'], answer: 2, explanation: '"Ought" is followed by "to" + base verb.' },
      { id: 'q3', type: 'tf', prompt: 'True or false: "She should goes to bed early." is correct.', answer: false, explanation: 'False. After "should" we use the base verb: "She should go to bed early."' },
      { id: 'q4', type: 'text', prompt: 'Complete: "If you ___ (study) hard, you will succeed."', accept: ['study'], explanation: 'In the if-clause we use the present simple: If you study.' },
      { id: 'q5', type: 'text', prompt: 'A person who designs computer programs is a ___.', accept: ['programmer', 'computer programmer', 'software developer', 'developer'], explanation: 'A programmer writes computer programs.' },
    ],
  },
];
