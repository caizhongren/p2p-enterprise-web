'use strict';
angular.module('hongcaiApp').directive('pagination', [function() {
  return {
    restrict: 'E',
    template: '<div class="clearfix margin-b-20" ng-if="statusx === 4"><div class="col-sx-12 text-center"><button class="btn btn-sm"  ng-disabled="page === 1"  ng-click="page = page -1;getPreProjects(page)">上一页</button>{{ page }} / {{totalPage}} 共 {{total}} 条<button class="btn btn-sm"  ng-disabled="page >= totalPage" ng-click="page = page + 1;getPreProjects(page)">下一页</button></div></div>',
  };
}]);