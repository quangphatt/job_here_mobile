import React, { createRef } from 'react';
import {
  DrawerActions,
  StackActions,
  CommonActions,
  TabActions
} from '@react-navigation/native';

export const isReadyRef = createRef();

export const navigationRef = createRef();

export function jumpTo(name, params) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current.dispatch(TabActions.jumpTo(name, params));
  }
}

export function navigate(name, params) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current.dispatch(CommonActions.navigate(name, params));
  }
}

export function navigatePush(name, params) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current.dispatch(StackActions.push(name, params));
  }
}

export function replace(name, params) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current.replace(name, params);
  }
}

export function getCurrentRoute() {
  if (isReadyRef.current && navigationRef.current) {
    return navigationRef.current?.getCurrentRoute();
  }
}

export function setParams(params) {
  if (isReadyRef.current && navigationRef.current) {
    return navigationRef.current?.setParams(params);
  }
}

export function openDrawer() {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current.dispatch(DrawerActions.openDrawer());
  }
}

export function closeDrawer() {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current.dispatch(DrawerActions.closeDrawer());
  }
}

export function goBack() {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current.goBack();
  }
}

export function pop(count) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current.dispatch(StackActions.pop(count));
  }
}

export function popToTop() {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current.dispatch(StackActions.popToTop());
  }
}
