var take, takeThree, lastThree, slice$ = [].slice;
take = curry$(function(n, list){
  var x, xs;
  x = list[0], xs = slice$.call(list, 1);
  switch (false) {
  case !(n <= 0):
    return [];
  case !empty(list):
    return [];
  default:
    return [x].concat(take(n - 1, xs));
  }
});
take(2, [1, 2, 3, 4, 5]);
takeThree = take(3);
takeThree([3, 4, 5, 6, 7, 8]);
lastThree = function(){
  return reverse(takeThree(reverse.apply(this, arguments)));
};
lastThree([1, 2, 3, 4, 5, 6, 7, 8]);
$('h1').on('click', function(){
  alert('boom!');
});
function curry$(f, bound){
  var context,
  _curry = function(args) {
    return f.length > 1 ? function(){
      var params = args ? args.concat() : [];
      context = bound ? context || this : this;
      return params.push.apply(params, arguments) <
          f.length && arguments.length ?
        _curry.call(context, params) : f.apply(context, params);
    } : f;
  };
  return _curry();
}