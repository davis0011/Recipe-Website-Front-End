<template>
      <div>
        <b-card class="about">
  <title>About David and Noam - Coding Aptitude</title>
  <h1>About David and Noam</h1>
  <p>Welcome to the coding world of David and Noam, two talented Information System Engineering students with an insatiable passion for innovation and technology.</p>
  <p>David and Noam are a dynamic duo, driven by their unwavering curiosity and boundless creativity. Their coding aptitude is unmatched, and they constantly push the boundaries of what's possible in the digital realm.</p>

  <h2>Previous Works</h2>
  <p>Explore their previous works and witness their coding prowess in action:</p>

  <h3>JavaScript Game</h3>
  <p>David and Noam collaborated on an exciting and addictive JavaScript game that showcases their skills in interactive web development. Get ready to be immersed in a world of fun and challenge with this impressive creation.</p>
  <p><a href="https://web-development-environments-2023.github.io/assignment2_209236926_315705111/">Play the game</a></p>

  <h3>Inspiring Figure Website</h3>
  <p>Both David and Noam believe in the power of inspiration. As a tribute to their role models, they each designed a captivating static website highlighting the life and achievements of the figure they look up to. Prepare to be inspired by the remarkable stories portrayed on these websites.</p>
  <p>David's figure website: <a href="https://web-development-environments-2023.github.io/209236926/">Link</a></p>
  <p>Noam's figure website: <a href="https://web-development-environments-2023.github.io/315705111/">Link</a></p>

  <p>Whether it's crafting intuitive user interfaces, developing efficient algorithms, or unraveling complex programming problems, David and Noam are always up for a coding challenge. Follow their journey as they continue to leave their mark on the digital landscape, one brilliant project at a time.</p>
</b-card>
</div>
</template>

<script>
export default {
    name: 'WorkspaceJsonAbout',

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="scss" scoped>
div {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 20px;
      padding: 0;
    }
.about{
    opacity: 0.9;
}
    h1 {
      color: #336699;
    }

    h2 {
      color: #444;
      margin-top: 20px;
    }

    h3 {
      color: #555;
      margin-top: 10px;
    }

    p {
      margin: 10px 0;
    }

    a {
      color: #0088cc;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }
</style>