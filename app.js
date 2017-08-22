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
        url = 'https://www.youtube.com/embed/' + video.youtubeId + '?showinfo=0&rel=0&origin=http://localhost:8000';
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
      "shortTitle": "Dusty Memories",
      "youtubeId": "p4OixRuu2yA",
      "title": "Dusty Memories - Burning Man 2016",
      "thumbnail_url": "https://i.ytimg.com/vi/p4OixRuu2yA/maxresdefault.jpg",
      "description": "After 9 years of consecutive burns and 4 years of creating burning man videos, here's my take on Burning Man 2016.",
      "slug": "dusty-memories"
    }, {
      "shortTitle": "In Dust We Trust",
      "youtubeId": "dmUCOHvmO7Q",
      "isAnamorphic": true,
      "title": "In Dust We Trust - Burning Man 2015",
      "thumbnail_url": "https://i.ytimg.com/vi/dmUCOHvmO7Q/maxresdefault.jpg",
      "description": "From magical sunrise moments, to the self-expression of dancers and fire performers, to the more spiritual sides of the festival and the epic burn of the man, this short film offers a deep dive into the moods of Burning Man 2015. Shot with cranes and stabilizers never brought before to the playa, for some unique camera angles and perspectives. Edited in a wide anamorphic format with a soundtrack seamlessly blending 3 tracks, it showcases the festival in a cinematic style.",
      "slug": "in-dust-we-trust"
    }, {
      "vimeoId": 161403622,
      "isAnamorphic": true,
      "title": "Prelude Forever",
      "description": "A short choreography showcasing the \"Isabelle\" cotton fringe wrap / scarf from Atelier Prélude.\n\nModel / dancer: Amanda Whipple\nStylist: Virginie Suos / Atelier Prélude\n\nwww.atelierprelude.com",
      "thumbnail_url": "https://i.vimeocdn.com/video/563627594_1280.jpg",
      "shortTitle": "Prelude Forever",
      "slug": "prelude-forever"
    }, {
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
      "shortTitle": "Je Suis Charlie",
      "youtubeId": "Ss8FKgD6ohY",
      "title": "Je Suis Charlie - San Francisco",
      "thumbnail_url": "https://i.ytimg.com/vi/Ss8FKgD6ohY/maxresdefault.jpg",
      "description": "This short clip documents the \"Je suis charlie\" rally that happened in San Francisco on January 7th, and intends to promote peace, non-violence, and fraternity across all countries and religions.",
      "slug": "je-suis-charlie"
    }, {
      "shortTitle": "Alight",
      "vimeoId": 104424875,
      "title": "Alight - Burning Man 2013",
      "description": "A music-video style edit shot at Burning Man 2013.\n\nCamera: Panasonic GH3\nLenses: Panasonic 12-35mm f2.8, Voigtlander 17.5mm f0.95\nStabilizer (handheld steady cam): Glidecam HD-1000\nEdited and color-graded in Final Cut Pro.",
      "thumbnail_url": "https://i.vimeocdn.com/video/486971868_1280.jpg",
      "slug": "alight"
    }
  ]);

}).call(this);

//# sourceMappingURL=app.js.map