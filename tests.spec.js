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
});
