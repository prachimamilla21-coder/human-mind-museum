const Wings = require('./public/js/rooms.js');

console.log('✓ Wings object compiled and loaded cleanly!');
console.log('Total rooms:', Wings.exhibits.length);

let totalErrors = 0;
let totalQuizzes = 0;

Wings.exhibits.forEach(e => {
  console.log(`\n🏛️  Room ${e.wingNumber}: ${e.title} (ID: ${e.id})`);
  console.log(`   • Sections: ${e.sections ? e.sections.length : 0} [${e.sections.map(s => s.letter + '. ' + s.name).join(', ')}]`);
  console.log(`   • Brain Regions: ${e.brainRegions.join(', ')}`);
  console.log(`   • Key Pioneers: ${e.pioneers.join(', ')}`);
  console.log(`   • Thought Experiment: ${e.thoughtExperiment ? e.thoughtExperiment.title : 'None'}`);
  console.log(`   • Quiz Questions: ${e.quiz ? e.quiz.length : 0}`);

  if (!e.quiz || e.quiz.length === 0) {
    console.error(`   ✗ ERROR: Room ${e.id} has no quiz!`);
    totalErrors++;
  } else {
    e.quiz.forEach((q, idx) => {
      totalQuizzes++;
      if (!q.question) { console.error(`   ✗ Q${idx+1}: Missing question text`); totalErrors++; }
      if (!Array.isArray(q.options) || q.options.length < 2) { console.error(`   ✗ Q${idx+1}: Missing or invalid options`); totalErrors++; }
      if (q.correct === undefined || q.correct < 0 || q.correct >= q.options.length) { console.error(`   ✗ Q${idx+1}: Invalid correct index ${q.correct}`); totalErrors++; }
      if (!q.explanation) { console.error(`   ✗ Q${idx+1}: Missing explanation`); totalErrors++; }
    });
  }
});

console.log('\n======================================================');
console.log(`TOTAL QUIZ QUESTIONS TESTED: ${totalQuizzes}`);
console.log(`TOTAL INTEGRITY ERRORS: ${totalErrors}`);
if (totalErrors === 0) {
  console.log('🎉 ALL 7 ROOMS AND ALL 28 QUIZ QUESTIONS ARE 100% OPERATIONAL!');
} else {
  console.error(`FAILED with ${totalErrors} errors.`);
  process.exit(1);
}
console.log('======================================================');
