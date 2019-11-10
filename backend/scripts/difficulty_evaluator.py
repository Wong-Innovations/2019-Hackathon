import os
import neat
import mingus
import mingus.extra.musicxml as musicxml
from mingus.containers import Track
import trainer
import pickle

def main(config_path):
  pickle_in = open("saved_winners.pickle", "rb")
  genomes = pickle.load(pickle_in)
  pickle_in.close()

  config = neat.config.Config(neat.DefaultGenome, neat.DefaultReproduction, 
                              neat.DefaultSpeciesSet, neat.DefaultStagnation,
                              config_path)

  for x, genome in enumerate(genomes):
    trainer.eval_fitness([(1, genome)], config)

    fitness = genome.fitness

    float_name = fitness * 1000

    int_name = int(float_name)

    name = str(int_name)

    os.mkdir(name)

    for i in range(15):
      song = trainer.generate_song(x + 1)

      track = Track()

      for bar in song:
        track.add_bar(bar)
      
      xml = musicxml.from_Track(track)

      path = name + "\\" + str(i) + ".musicxml"
      xml_file = open(path, "w")

      xml_file.write('<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 2.0 Partwise//EN"\n  "http://www.musicxml.org/dtds/partwise.dtd">\n' + xml)



if __name__ == "__main__":
  local_dir = os.path.dirname(__file__)
  config_path = os.path.join(local_dir, "config-feedforward.txt")

  main(config_path)
