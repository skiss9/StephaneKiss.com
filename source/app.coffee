window.app = angular.module('application', ['ngRoute'])


app.config (
  $locationProvider
  $routeProvider
) ->
  $locationProvider.html5Mode(true)

  $routeProvider
    .when('/films/:video', {})
    .otherwise('/', {})


app.controller 'mainController', (
  $scope
  $route
  $location
  $timeout
  $sce
  videos
) ->

  _folloButtonTimeout = null

  getVideoSlug = (route) -> route?.params?.video

  $scope.$on '$routeChangeStart', ($evt, route) ->
    slug = getVideoSlug(route)
    if slug and not _.find(videos, { slug: slug })
      $location.path('')

  $scope.$on '$routeChangeSuccess', ($evt, route) ->
    slug = getVideoSlug(route)
    if slug
      $scope.currentVideo = _.find($scope.videos, { slug: slug })
    else
      $scope.currentVideo = null

  $scope.videos = videos

  $scope.getThumbnailUrl = (video, thumbnailIndex, isLarge) ->
    suffix = ''
    if thumbnailIndex
      suffix = '-' + thumbnailIndex
    else if isLarge
      suffix = '-large'
    return 'images/' + video.slug + '/pic' + suffix + '.jpg'

  $scope.getEmbedUrl = (video) ->
    url = null
    if video.vimeoId
      url = 'https://player.vimeo.com/video/' + video.vimeoId + '?title=0&byline=0&portrait=0'
    else if video.youtubeId
      url = 'https://www.youtube.com/embed/' + video.youtubeId + '?rel=0&amp;showinfo=0'
    else if video.dacastId
      url = 'https://iframe.dacast.com/' + video.dacastId
    $sce.trustAsResourceUrl(url)

  $scope.isAnamorphic = (video) -> !!video.isAnamorphic

  $scope.goTo = (video) ->
    path = if video then 'films/' + video.slug else ''
    $location.path(path)

  $scope.getThumbnailIndexes = -> [1..16]

  $scope.getHoverIndex = ($event, video) ->
    x = $event.offsetX
    percent = x / 295
    return Math.floor(percent * 24) + 1

  $scope.openShareDialog = ->
    FB.ui
      method: 'share'
      href: location.href

  $scope.expandFollowButtons = ->
    $scope.followButtonsAreExpanded = true
    $timeout.cancel(_folloButtonTimeout) if _folloButtonTimeout
    _folloButtonTimeout = $timeout ->
        $scope.followButtonsAreExpanded = false
      , 8000
