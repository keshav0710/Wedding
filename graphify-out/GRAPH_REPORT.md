# Graph Report - .  (2026-04-13)

## Corpus Check
- 6 files · ~228,540 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 29 nodes · 24 edges · 7 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]

## God Nodes (most connected - your core abstractions)
1. `useCountdown()` - 2 edges
2. `CoverSlide()` - 2 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Communities

### Community 0 - "Community 0"
Cohesion: 0.1
Nodes (0): 

### Community 1 - "Community 1"
Cohesion: 1.0
Nodes (2): CoverSlide(), useCountdown()

### Community 2 - "Community 2"
Cohesion: 1.0
Nodes (0): 

### Community 3 - "Community 3"
Cohesion: 1.0
Nodes (0): 

### Community 4 - "Community 4"
Cohesion: 1.0
Nodes (0): 

### Community 5 - "Community 5"
Cohesion: 1.0
Nodes (0): 

### Community 6 - "Community 6"
Cohesion: 1.0
Nodes (0): 

## Knowledge Gaps
- **Thin community `Community 1`** (2 nodes): `CoverSlide()`, `useCountdown()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2`** (2 nodes): `reportWebVitals()`, `reportWebVitals.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 3`** (2 nodes): `supabase.js`, `getImageUrl()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 4`** (1 nodes): `App.test.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 5`** (1 nodes): `index.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 6`** (1 nodes): `setupTests.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._