'use strict'

var descriptors = [
  {name:'text', description:'text',features:[
    {name:'text',description:'text',type:'pool/skill/inability/special/gear',value:'num',}],},
  {name:'Dishonerable', description:'big block here',features:[
    {name:'Sneaky',
      description:'+4 to your speed pool',
      type:'bonusSpeedPool',
      value:4,},
    {name:'Skill',
      description:'You are trained in deception',
      type:'bonusSkill',
      value:'Deception',},
    {name:'Inability',
      description:'People don’t like or trust you. Pleasant social interactions are hindered',
      type:'inability',
      value:'pleasantSocial',}
  ],
  }
];