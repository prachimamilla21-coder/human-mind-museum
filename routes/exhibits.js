const express = require('express');
const router = express.Router();
const db = require('../database');

// Get all museum wings & exhibits
router.get('/', (req, res) => {
  try {
    const exhibits = db.getExhibits();
    res.json(exhibits);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve exhibits.' });
  }
});

// Get single exhibit wing with extended curation details
router.get('/:id', (req, res) => {
  try {
    const exhibit = db.getExhibitById(req.params.id);
    if (!exhibit) {
      return res.status(404).json({ error: 'Exhibit wing not found.' });
    }

    // Extended curated materials for deep interaction
    const extraDetails = {
      thoughtExperiment: {
        consciousness: {
          title: "Mary the Color Scientist (Frank Jackson's Dilemma)",
          scenario: "Mary is a brilliant neuroscientist who lives in a black-and-white room and learns every physical and neurological fact about color perception. One day, she steps outside and sees a ripe red apple for the first time. Does she learn anything new?",
          takeaway: "If Mary learns something new, physicalism is incomplete: subjective conscious experience ('qualia') cannot be purely reduced to objective neural equations."
        },
        emotions: {
          title: "The Bridge of Capilano (Dutton & Aron Misattribution Experiment)",
          scenario: "Young men crossed either a terrifying, swaying 230-foot suspension bridge or a safe, sturdy cedar bridge. An attractive experimenter interviewed them and offered her phone number. Far more men from the suspension bridge called her back.",
          takeaway: "The brain frequently misattributes autonomic physiological arousal (racing heart, sweaty palms from fear) as passionate romantic attraction."
        },
        memory: {
          title: "The Lost in the Mall Experiment",
          scenario: "Psychologist Elizabeth Loftus told participants four childhood stories provided by their families. Three were true; one was completely fabricated: getting lost in a shopping mall at age five and rescued by an elderly woman.",
          takeaway: "Over 25% of participants began 'remembering' rich, vivid details of the fake event, proving memories are reconstructed rather than played back."
        },
        decisions: {
          title: "The Asian Disease Problem (Kahneman & Tversky)",
          scenario: "When told a disease will kill 600 people, Program A saves 200 people with certainty (chosen by 72%). But when framed as '400 people will die' (Program C), 78% reject it and gamble—despite the outcomes being mathematically identical.",
          takeaway: "Human beings are risk-averse when outcomes are framed as gains, but risk-seeking when the identical outcome is framed as a loss."
        },
        identity: {
          title: "The Teletransporter Paradox (Derek Parfit)",
          scenario: "A machine scans every atom in your body, destroys your physical form on Earth, and beams the exact blueprint to Mars where a replication chamber reconstitutes you atom-for-atom. Did you travel to Mars, or did you die on Earth while a replica woke up?",
          takeaway: "Challenges whether the self is an unbroken physical entity or an illusory continuity of memory and consciousness."
        }
      }[req.params.id],
      audioGuideScript: `Welcome to Wing ${exhibit.wingNumber}: ${exhibit.title}. Put on your headphones and observe the displays around you. In this wing, we deconstruct the boundaries between external reality and internal computation.`
    };

    res.json({
      ...exhibit,
      ...extraDetails
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch exhibit detail.' });
  }
});

module.exports = router;
