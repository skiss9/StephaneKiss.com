(function() {
  window.app = angular.module('application', ['ngRoute']);

  app.config(function($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);
    return $routeProvider.when('/films/:video', {}).otherwise('/', {});
  });

  app.controller('mainController', function($scope, $route, $location, $timeout, $sce, videos) {
    var _folloButtonTimeout, getVideoSlug;
    _folloButtonTimeout = null;
    getVideoSlug = function(route) {
      var ref;
      return route != null ? (ref = route.params) != null ? ref.video : void 0 : void 0;
    };
    $scope.$on('$routeChangeStart', function($evt, route) {
      var slug;
      slug = getVideoSlug(route);
      if (slug && !_.find(videos, {
        slug: slug
      })) {
        return $location.path('');
      }
    });
    $scope.$on('$routeChangeSuccess', function($evt, route) {
      var slug;
      slug = getVideoSlug(route);
      if (slug) {
        return $scope.currentVideo = _.find($scope.videos, {
          slug: slug
        });
      } else {
        return $scope.currentVideo = null;
      }
    });
    $scope.videos = videos;
    $scope.getThumbnailUrl = function(video, thumbnailIndex, isLarge) {
      var suffix;
      suffix = '';
      if (thumbnailIndex) {
        suffix = '-' + thumbnailIndex;
      } else if (isLarge) {
        suffix = '-large';
      }
      return 'images/' + video.slug + '/pic' + suffix + '.jpg';
    };
    $scope.getEmbedUrl = function(video) {
      var url;
      url = null;
      if (video.vimeoId) {
        url = 'https://player.vimeo.com/video/' + video.vimeoId + '?title=0&byline=0&portrait=0';
      } else if (video.youtubeId) {
        url = 'https://www.youtube.com/embed/' + video.youtubeId + '?rel=0&amp;showinfo=0';
      } else if (video.dacastId) {
        url = 'https://iframe.dacast.com/' + video.dacastId;
      }
      return $sce.trustAsResourceUrl(url);
    };
    $scope.isAnamorphic = function(video) {
      return !!video.isAnamorphic;
    };
    $scope.goTo = function(video) {
      var path;
      path = video ? 'films/' + video.slug : '';
      return $location.path(path);
    };
    $scope.getThumbnailIndexes = function() {
      return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    };
    $scope.getHoverIndex = function($event, video) {
      var percent, x;
      x = $event.offsetX;
      percent = x / 295;
      return Math.floor(percent * 24) + 1;
    };
    $scope.openShareDialog = function() {
      return FB.ui({
        method: 'share',
        href: location.href
      });
    };
    return $scope.expandFollowButtons = function() {
      $scope.followButtonsAreExpanded = true;
      if (_folloButtonTimeout) {
        $timeout.cancel(_folloButtonTimeout);
      }
      return _folloButtonTimeout = $timeout(function() {
        return $scope.followButtonsAreExpanded = false;
      }, 8000);
    };
  });

}).call(this);

(function() {
  app.constant('videos', [
    {
      "vimeoId": 128578398,
      "isAnamorphic": true,
      "title": "Further Future",
      "description": "A short film shot at the first edition of Further Future\nMay 1st - May 3rd 2015, Moapa River Indian Reservation, Nevada\n\nCamera: Sony a7s\nLenses: Zeiss Loxia 35mm f/2, Rokinon 14mm f/2.8\nEdited and color-graded in Final Cut Pro X\n\nSoundtrack:\nAidan Lavelle & Robbie Akbal - Stars (feat. Shawni) [André Hommen Remix]\nhttps://pro.beatport.com/track/stars-featuring-shawni-andre-hommen-remix/5935888",
      "thumbnail_url": "https://i.vimeocdn.com/video/519921178_1280.jpg",
      "shortTitle": "Further Future",
      "slug": "further-future"
    }, {
      "shortTitle": "Alternate Reality",
      "vimeoId": 127466230,
      "title": "Alternate Reality - Burning Man 2014",
      "description": "This short film portrays the magical, dreamy and inspiring sides of Burning Man. Shot in 2014 documentary style, without any setup or staging, but post-processed with slow motion and creative color grading, techniques typically used for fiction or music video work. Watch full screen with good sound and step into the alternate reality!\n\nCamera: Sony a7s\nLenses: Canon 35mm f/1.4 L, Canon 16-35mm f/4 IS L with Metabones Adapter IV\nStabilizer (handheld steadicam): Glidecam HD-1000\nEdited and color-graded in Final Cut Pro X\nPlugins: Tritone Overlays\n\nSoundtrack mixed in Logic Pro",
      "thumbnail_url": "https://i.vimeocdn.com/video/518298068_1280.jpg",
      "slug": "alternate-reality"
    }, {
      "vimeoId": 113383037,
      "title": "Classical Revolution",
      "description": "",
      "thumbnail_url": "https://i.vimeocdn.com/video/498679888_1280.jpg",
      "shortTitle": "Classical Revolution",
      "slug": "classical-revolution"
    }, {
      "title": "Je Suis Charlie",
      "dacastId": "b/375/f/218835",
      "shortTitle": "Je Suis Charlie",
      "slug": "je-suis-charlie"
    }, {
      "title": "St Lucia",
      "dacastId": "b/375/f/185712",
      "shortTitle": "St Lucia",
      "slug": "st-lucia"
    }, {
      "shortTitle": "Sunset At Pink Mammoth",
      "vimeoId": 105745990,
      "title": "Sunset at Pink Mammoth - Burning Man 2014",
      "description": "I hope you enjoy this short edit. All the footage was shot in less than 30 minutes the last sunday, as the sun was setting over Pink Mammoth. Hopefully it conveys the magic and intensity of that very special moment.\n\nStay tuned for my full 2014 Burning Man video.",
      "thumbnail_url": "https://i.vimeocdn.com/video/488640717_1280.jpg",
      "slug": "sunset-at-pink-mammoth"
    }, {
      "shortTitle": "Alight",
      "vimeoId": 104424875,
      "title": "Alight - Burning Man 2013",
      "description": "A music-video style edit shot at Burning Man 2013.\n\nCamera: Panasonic GH3\nLenses: Panasonic 12-35mm f2.8, Voigtlander 17.5mm f0.95\nStabilizer (handheld steady cam): Glidecam HD-1000\nEdited and color-graded in Final Cut Pro.",
      "thumbnail_url": "https://i.vimeocdn.com/video/486971868_1280.jpg",
      "slug": "alight"
    }, {
      "vimeoId": 90440491,
      "title": "The Great Gatsby Night",
      "description": "",
      "thumbnail_url": "https://i.vimeocdn.com/video/469648765_1280.jpg",
      "shortTitle": "The Great Gatsby Night",
      "slug": "the-great-gatsby-night"
    }
  ]);

}).call(this);

//# sourceMappingURL=app.js.map