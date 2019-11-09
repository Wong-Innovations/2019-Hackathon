import os
import neat
from mingus.containers import Note



ACCURACY = 100

def eval_fitness(genomes, config):
  nets = []
  ge = []
  sum_ratios = []

  for _, g in genomes:
    net = neat.nn.FeedForwardNetwork.create(g, config)
    nets.append(net)
    ge.append(g)
    sum_ratios.append(0)
  
  song = generate_song(0)
  one_beat = ACCURACY


def run(config_file: str):
  config = neat.config.Config(neat.DefaultGenome, neat.DefaultReproduction, 
                              neat.DefaultSpeciesSet, neat.DefaultStagnation,
                              config_path)
  
  population = neat.Population(config)
  
  population.add_reporter(neat.StdOutReporter(True))
  stats = neat.StatisticsReporter()
  population.add_reporter(stats)

  winner = population.run(eval_fitness, 100)

if __name__ == "__main__":
  local_dir = os.path.dirname(__file__)
  config_path = os.path.join(local_dir, "config-feedforward.txt")

  run(config_path)
