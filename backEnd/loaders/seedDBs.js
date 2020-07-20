'use strict';

const loadDescriptorList = require('./loadDescriptorList.js');
const loadDescriptorSkills = require('./loadDescriptorSkills');
const loadFocusSkills = require('./loadFocusSkills');
const loadAbilityInfo = require('./loadAbilityInfo');
const loadTypeInfo = require('./loadTypeInfo');
const focusSkillDetail = require('./focusSkillDetail');

loadDescriptorList();
loadDescriptorSkills();
loadFocusSkills();
loadAbilityInfo();
loadTypeInfo();
focusSkillDetail();
