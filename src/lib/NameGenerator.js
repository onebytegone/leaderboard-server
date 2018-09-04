'use strict';

var _ = require('underscore'),
    Class = require('class.extend'),
    PREFIXES, ANIMALS;

PREFIXES = [
   'Anonymous', 'Unnamed', 'Incognito', 'Secret', 'Unsigned',
];

ANIMALS = [
   'Alligator', 'Alpaca', 'Ant', 'Antelope', 'Ape', 'Armadillo', 'Baboon',
   'Badger', 'Bat', 'Bear', 'Beaver', 'Bee', 'Beetle', 'Buffalo', 'Butterfly',
   'Camel', 'Caribou', 'Cat', 'Cattle', 'Cheetah', 'Chimpanzee', 'Chinchilla',
   'Cicada', 'Clam', 'Cockroach', 'Cod', 'Coyote', 'Crab', 'Cricket', 'Raven',
   'Deer', 'Dinosaur', 'Dog', 'Dolphin', 'Porpoise', 'Duck', 'Eel', 'Elephant',
   'Elk', 'Fish', 'Fly', 'Fox', 'Gerbil', 'Giraffe', 'Gnat', 'Gnu', 'Goat',
   'Goldfish', 'Gorilla', 'Grasshopper', 'Guinea pig', 'Hamster', 'Hare',
   'Hedgehog', 'Herring', 'Hippopotamus', 'Hornet', 'Horse', 'Hound', 'Hyena',
   'Impala', 'Insect', 'Jackal', 'Jellyfish', 'Kangaroo, ', 'Wallaby', 'Koala',
   'Leopard', 'Lion', 'Lizard', 'Llama', 'Locust', 'Louse', 'Macaw', 'Mallard',
   'Mammoth', 'Manatee', 'Marten', 'Mink', 'Minnow', 'Monkey', 'Moose',
   'Mosquito', 'Mule', 'Otter', 'Ox', 'Oyster', 'Panda', 'Platypus',
   'Porcupine', 'Pug', 'Rabbit', 'Raccoon', 'Reindeer', 'Rhinoceros', 'Salmon',
   'Sardine', 'Scorpion', 'Seal', 'Shark', 'Sheep', 'Snail', 'Snake', 'Spider',
   'Squirrel', 'Swan', 'Tiger', 'Trout', 'Turtle', 'Walrus', 'Wasp', 'Weasel',
   'Whale', 'Wolf', 'Wombat', 'Woodchuck', 'Worm', 'Yak', 'Zebra',
];

module.exports = Class.extend({

   generateName: function() {
      return _.sample(PREFIXES) + ' ' + _.sample(ANIMALS);
   },

});
