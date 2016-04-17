import './chatters.css';
import angular from 'angular';
import template from './chatters.html';
import {chatters} from '../../../lib/api';

angular.module('tc').directive('chatters',
  ($http, settings, session, channels) => {

  function link(scope) {
    let forceShowViewers = false;
    let timeout = null;
    scope.api = null;

    fetchList();
    setInterval(fetchList, 120000);

    channels.on('change', function() {
      forceShowViewers = false;
      if (!scope.api) timeoutFetch(200);
      else timeoutFetch(2000);
    });

    scope.showViewers = function(force) {
      if (typeof force === 'boolean') forceShowViewers = force;
      if (!scope.api) return false;
      if (scope.api.chatters.viewers.length < 201) return true;
      else return forceShowViewers;
    };

    scope.tooManyNotDoable = function() {
      return scope.api && scope.api.chatters.viewers.length > 10000;
    };

    scope.selectUser = function(username) {
      session.selectedUser = username;
      session.selectedUserChannel = scope.channel;
    };

    async function fetchList(attemptNumber) {
      if (!isChannelSelected()) return;
      try {scope.api = await chatters(scope.channel);}
      catch (e) {
        attemptNumber = attemptNumber || 1;
        console.warn('CHATTERS: Failed to get user list. ' + attemptNumber, e);
        if (attemptNumber < 6) fetchList(attemptNumber + 1);
      }
      scope.$apply();
    }

    function isChannelSelected() {
      return settings.channels[settings.selectedTabIndex] === scope.channel;
    }

    function timeoutFetch(duration) {
      clearTimeout(timeout);
      timeout = setTimeout(fetchList, duration);
    }
  }

  return {restrict: 'E', template, link, scope: {channel: '='}}
});