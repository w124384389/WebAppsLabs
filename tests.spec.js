describe('Your code for binSearch', function() {
   it('loads', function() {

   });
   it('defines a binSearch function', function() {
      expect(binSearch).to.exist();
      expect(binSearch).to.be.a('function');
   });
   it('works correctly on an empty array', function() {
      expect(binSearch([], Math.random())).to.equal(false);
   });
   it('works correctly on values outside the array bounds', function() {
      var f1 = function() { return binSearch([Math.random(), 3, 4], -2); }
      var f2 = function() { return binSearch([Math.random(), 3, 4], 10); }
      expect(f1).to.not.throw(Error);
      expect(f2).to.not.throw(Error);
      expect(f1()).to.equal(false);
      expect(f2()).to.equal(false);
   });
   it('works correctly on a single element array', function() {
      var m = Math.random() * 10;
      expect(binSearch([m], m + 1)).to.equal(false);
      expect(binSearch([m], m)).to.equal(true);
   });
   it('works correctly on a two-element array', function() {
      var m = Math.random() * 10;
      expect(binSearch([m, m + 1], m + 1)).to.equal(true);
      expect(binSearch([m, m + 1], m)).to.equal(true);
      expect(binSearch([m, m + 1], m + 0.5)).to.equal(false);
   });
   it('correctly finds middle element', function() {
      var arr = [Math.random(), Math.random() + 1, Math.random() + 2];
      expect(binSearch(arr, arr[1])).to.equal(true);
   });
   it('works in cases where multiple elements are equal', function() {
      var m = Math.random() * 10;
      expect(binSearch([m - 3, m, m, m + 3], m)).to.equal(true);
      expect(binSearch([m - 3, m, m, m + 3], m + 1)).to.equal(false);
   });
   it('correctly identifies misses in large arrays', function() {
      var N = 10000, arr = [];
      for (var i = 0; i < N; i += 1) { arr[i] = Math.random(); }
      arr.sort();
      for (var reps = 0; reps < 50; reps += 1) {
         expect(binSearch(arr, Math.random())).to.equal(false);
      }
   });
   it('correctly identifies hits in large arrays', function() {
      var N = 10000, arr = [];
      for (var i = 0; i < N; i += 1) { arr[i] = Math.random(); }
      arr.sort();
      for (var reps = 0; reps < 50; reps += 1) {
         expect(binSearch(arr, arr[Math.floor(Math.random() * 8000 + 500])))
            .to.equal(true);
      }
   });
   it('runs in reasonable time for large arrays (max 10 seconds)', function(done) {
      this.timeout(10 * 1000);  // 10 seconds
      var Ns = [100000, 300000];
      // Runs 50000 repetitions of searching for a non-existent value on
      // two arrays of sizes 100k and 300k.
      // Linear time searches would be too slow.
      var reps = 50000;
      var times = Ns.map(function(N) {
         var arr = [];
         for (var i = 0; i < N; i += 1) { arr[i] = Math.random(); }
         arr.sort();
         for (var rep = 0; rep < reps; rep += 1) {
            binSearch(arr, Math.random());
         }
      });
      done();
   });
});
