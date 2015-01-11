describe('Your code for binarySearch', function() {
   it('loads', function() {

   });
   it('defines a binarySearch function', function() {
      expect(binarySearch).to.exist();
      expect(binarySearch).to.be.a('function');
   });
   it('works correctly on an empty array', function() {
      expect(binarySearch([], Math.random())).to.equal(false);
   });
   it('works correctly on values outside the array bounds', function() {
      var f1 = function() { return binarySearch([Math.random(), 3, 4], -2); }
      var f2 = function() { return binarySearch([Math.random(), 3, 4], 10); }
      expect(f1).to.not.throw(Error);
      expect(f2).to.not.throw(Error);
      expect(f1()).to.equal(false);
      expect(f2()).to.equal(false);
   });
   it('works correctly on a single element array', function() {
      var m = Math.random() * 10;
      expect(binarySearch([m], m + 1)).to.equal(false);
      expect(binarySearch([m], m)).to.equal(true);
   });
   it('works correctly on a two-element array', function() {
      var m = Math.random() * 10;
      expect(binarySearch([m, m + 1], m + 1)).to.equal(true);
      expect(binarySearch([m, m + 1], m)).to.equal(true);
      expect(binarySearch([m, m + 1], m + 0.5)).to.equal(false);
   });
   it('correctly finds middle element', function() {
      var arr = [Math.random(), Math.random() + 1, Math.random() + 2];
      expect(binarySearch(arr, arr[1])).to.equal(true);
   });
   it('works in cases where multiple elements are equal', function() {
      var m = Math.random() * 10;
      expect(binarySearch([m - 3, m, m, m + 3], m)).to.equal(true);
      expect(binarySearch([m - 3, m, m, m + 3], m + 1)).to.equal(false);
   });
   it('correctly identifies misses in large arrays', function() {
      var N = 10000, arr = [];
      for (var i = 0; i < N; i += 1) { arr[i] = Math.random(); }
      arr.sort(function(a, b) { return a - b; });
      for (var reps = 0; reps < 50; reps += 1) {
         expect(binarySearch(arr, Math.random())).to.equal(false);
      }
   });
   it('correctly identifies hits in large arrays', function() {
      var N = 10000, arr = [];
      for (var i = 0; i < N; i += 1) { arr[i] = Math.random(); }
      arr.sort(function(a, b) { return a - b; });
      for (var reps = 0; reps < 50; reps += 1) {
         expect(binarySearch(arr, arr[Math.floor(Math.random() * 8000 + 500)]))
            .to.equal(true);
      }
   });
   it('runs in reasonable time for large arrays (max 10 seconds)', function(done) {
      this.timeout(10 * 1000);  // 10 seconds
      var N = 100000;
      // Runs 50000 repetitions of searching for a non-existent value on
      // an array of size 100k
      // Linear time searches would be too slow.
      var reps = 50000;
      var arr = [];
      for (var i = 0; i < N; i += 1) { arr[i] = Math.random(); }
      arr.sort(function(a, b) { return a - b; });
      for (var rep = 0; rep < reps; rep += 1) {
         binarySearch(arr, Math.random());
      }
      done();
   });
});
describe('Your code for countTags', function() {
   function randomString(len) {
      var arr = [], caseRange, i;
      for (i = 0; i < len; i += 1) {
         caseRange = [65, 97][Math.floor(Math.random() * 2)];
         arr.push(Math.floor(Math.random() * 26) + caseRange);
      }
      return String.fromCharCode.apply(String, arr);
   }
   it('loads', function() {

   });
   it('defines a countTags function', function() {
      expect(countTags).to.exist();
      expect(countTags).to.be.a('function');
   });
   it('returns an object', function() {
      expect(countTags([])).to.be.an('object');
   });
   it('returns no tags for an empty array', function() {
      expect(Object.keys(countTags([])).length).to.equal(0);
   });
   it('works if tags key is not present', function() {
      expect(function() { countTags([{ foo: '' }]) }).to.not.throw(Error);
   });
   it('works if tags is not array', function() {
      expect(function() { countTags([{ tags: '' }]) }).to.not.throw(Error);
      expect(Object.keys(countTags([{ tags: '' }])).length).to.equal(0);
      expect(function() { countTags([{ tags: null }]) }).to.not.throw(Error);
      expect(Object.keys(countTags([{ tags: null }])).length).to.equal(0);
   });
   it('counts a tag if a tag is found', function() {
      var tag = randomString(7);
      expect(countTags([{ tags: [tag] }])[tag]).to.equal(1);
   });
   it('counts a tag the number of times it is found', function() {
      var tag = randomString(7);
      var otherTag = randomString(7);
      var o = [
         { tags: [tag, otherTag] },
         { tags: [tag] },
         { tags: [otherTag] },
         { tags: [] },
         { tags: [tag] }
      ];
      expect(Object.keys(countTags(o)).length).to.equal(2);
      expect(countTags(o)[tag]).to.equal(3);
      expect(countTags(o)[otherTag]).to.equal(2);
   });
});
describe('Your code for extractHashTags', function() {
   it('loads', function() {

   });
   it('defines a extractHashTags function', function() {
      expect(extractHashTags).to.exist();
      expect(extractHashTags).to.be.a('function');
   });
   it('returns an array', function() {
      expect(extractHashTags('')).to.be.an('array');
   });
   it('returns empty array if no hashtags', function() {
      expect(extractHashTags('A plain text string').length).to.equal(0);
      expect(extractHashTags('No hashtag # here').length).to.equal(0);
      expect(extractHashTags('Numbered not valid either #12').length).to.equal(0);
   });
   it('finds a hashtag at end of line', function() {
      expect(extractHashTags('A plain text string with #one')).to.deep.equal(['one']);
      expect(extractHashTags('ok if next to others#likeso')).to.deep.equal(['likeso']);
   });
   it('finds a hashtag at middle', function() {
      expect(extractHashTags('A plain text #one string with')).to.deep.equal(['one']);
      expect(extractHashTags('ok if next#likeso to others')).to.deep.equal(['likeso']);
   });
   it('finds a hashtag at beginning', function() {
      expect(extractHashTags('#one A plain text string with')).to.deep.equal(['one']);
      expect(extractHashTags('#likeso-a dash can separate things')).to.deep.equal(['likeso']);
   });
   it('finds multiple hashtags', function() {
      expect(extractHashTags('A plain text string with #one #two').sort()).to.deep.equal(['one', 'two']);
      expect(extractHashTags('Back to back #one#two').sort()).to.deep.equal(['one', 'two']);
      expect(extractHashTags('Spaced #one apart #two').sort()).to.deep.equal(['one', 'two']);
   });
   it('ignores duplicates', function() {
      expect(extractHashTags('A plain #one text#two string with #one #two').sort())
         .to.deep.equal(['one', 'two']);
   });
});
