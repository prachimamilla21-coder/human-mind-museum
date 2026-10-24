<?php
require_once __DIR__ . '/../../config/db.php';

$input = getJsonInput();
$message = trim($input['message'] ?? '');
$roomContext = trim($input['roomContext'] ?? 'atrium');
$tourId = trim($input['tourId'] ?? '');

$lower = strtolower($message);

$reply = "";
$suggestedAction = null;

if (strpos($lower, 'memory') !== false || strpos($lower, 'recall') !== false || strpos($lower, 'forgetting') !== false) {
    $reply = "In our Memory Room, we study Hermann Ebbinghaus's exponential forgetting curve. Without spaced repetition or consolidation in the hippocampus, human working memory degrades up to 70% within 24 hours. Would you like to enter Room 1: Memory & Recall?";
    $suggestedAction = ["type" => "navigate", "target" => "wings", "roomId" => "memory"];
} elseif (strpos($lower, 'emotion') !== false || strpos($lower, 'fear') !== false || strpos($lower, 'amygdala') !== false) {
    $reply = "The Amygdala coordinates our rapid subcortical threat detection—triggering autonomic fight-or-flight before conscious cortical awareness. The Emotion Room contrasts James-Lange bodily feedback against Damasio's somatic marker hypothesis.";
    $suggestedAction = ["type" => "navigate", "target" => "wings", "roomId" => "emotion"];
} elseif (strpos($lower, 'bias') !== false || strpos($lower, 'heuristics') !== false || strpos($lower, 'anchoring') !== false) {
    $reply = "Kahneman and Tversky demonstrated that System 1 intuition relies on evolutionary cognitive heuristics like Anchoring and Confirmation Bias. Our Cognitive Bias Room features interactive price-anchoring experiments.";
    $suggestedAction = ["type" => "navigate", "target" => "wings", "roomId" => "cognitive-bias"];
} elseif (strpos($lower, 'personality') !== false || strpos($lower, 'ocean') !== false || strpos($lower, 'introvert') !== false) {
    $reply = "The Big Five (OCEAN) framework remains modern psychology's most validated dimensional trait model. In Room 4, you can plot your real-time OCEAN radar chart.";
    $suggestedAction = ["type" => "navigate", "target" => "wings", "roomId" => "personality"];
} elseif (strpos($lower, 'decision') !== false || strpos($lower, 'will') !== false || strpos($lower, 'monty') !== false) {
    $reply = "Executive decision-making resides in the dorsolateral prefrontal cortex. Behavioral economists found that humans experience the psychological pain of loss twice as intensely as the pleasure of gain.";
    $suggestedAction = ["type" => "navigate", "target" => "wings", "roomId" => "decision-making"];
} elseif (strpos($lower, 'hello') !== false || strpos($lower, 'hi') !== false || strpos($lower, 'who are you') !== false) {
    $reply = "Welcome to The Human Mind Museum! I am Dr. Sophia Vance, your Senior Cognitive Docent. I can guide you across our 7 psychology halls, explain neurochemical pathways, or take you on an expedition.";
} else {
    $reply = "Fascinating inquiry. As your docent, I recommend exploring our 7 Educational Psychology Rooms and completing each 4-question mastery quiz to stamp your Holographic Visitor Pass.";
}

sendResponse([
    "reply" => $reply,
    "docent" => "Dr. Sophia Vance",
    "roomContext" => $roomContext,
    "suggestedAction" => $suggestedAction,
    "timestamp" => date('Y-m-d H:i:s')
]);
