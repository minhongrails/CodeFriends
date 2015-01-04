/*global angular:true */
'use strict';

angular.module('code.toolbar', ['ui.bootstrap'])
  .controller('toolbarController', function ($scope, $stateParams, $http, ToolbarDocument, $modal) {
    $scope.themes = [
      'Default',
      'Ambiance',
      'Base16 Dark',
      'Base16 Light',
      'Blackboard',
      'Cobalt',
      'Eclipse',
      'Elegant',
      'Lesser Dark',
      'Midnight',
      'Monokai',
      'Neat',
      'Neo',
      'Night',
      'Paraiso Dark',
      'Paraiso Light',
      'Ruby Blue',
      'Solarized Dark',
      'Solarized Light',
      'Twilight',
      'Vibrant Ink',
      'Xq Dark',
      'Xq Light',
      '3024 Day',
      '3024 Night'
    ];

    var formatThemeName = function (theme) {
      theme = theme.toLowerCase();
      if (theme.split(' ')[0] === 'solarized') return theme;
      return theme.replace(' ', '-');
    };

    $scope.changeEditorTheme = function (event) {
      ToolbarDocument.changeTheme(formatThemeName(event.target.innerText));
    };

    $scope.openAddFileModal = function () {
      $modal.open({
        templateUrl: '/app/templates/modalAddFile.html',
        controller: 'modalProjectController',
        size: 'sm'
      });
    };

    $scope.openAddFolderModal = function () {
      $modal.open({
        templateUrl: '/app/templates/modalAddFolder.html',
        controller: 'modalProjectController',
        size: 'sm'
      });
    };

    $scope.openAddUserModal = function () {
      $modal.open({
        templateUrl: '/app/templates/modalAddUser.html',
        controller: 'modalProjectController',
        size: 'sm'
      });
    };
  })
  .controller('modalProjectController', function ($scope, $stateParams, $modalInstance, Files, Projects) {
    $scope.addFile = function () {
      $modalInstance.close();
      Files.addNewFile($scope.newFileName, $stateParams.projectName)
        .then(function () {
          console.log('New File Created');
        });
    };

    $scope.addFolder = function () {
      $modalInstance.close();
      Files.addNewFolder($scope.newFolderName, $stateParams.projectName)
        .then(function () {
          console.log('New Folder Created');
        });
    };

    $scope.addUser = function () {
      $modalInstance.close();
      Projects.addUser($scope.addedUserName, $stateParams.projectName);
    };
  });