 ![GitHub release (latest by date)](https://img.shields.io/github/v/release/ars2062/freeze-package-versions)


<div id="top"></div>

# freeze package versions

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#options">Options</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
fix `package.json` dependecy versions by freezing them.
sometimes when working on a project apon cloning and installing the dependencies of your project, there is chance that a dependency updates and ruins your project. but there is no easy way of finding the currect version of that dependency for you. it is recomended to freeze all your dependecy versions with a valid lock file (`package-lock.json` or `yarn.lock`), and with this package you can automatically do it!

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- USAGE EXAMPLES -->
## Usage
### installation
install cli by the following command:
```bash
npm install -g freeze-package-versions
```
### running
just run it by
`(locally)`
```bash
freeze-package-versions
```
`(globaly)`
```bash
npx freeze-package-versions
```
if you have multiple lock files you will be prompt to choose one.
it also supports monorepos so if you have nested projectss there is no need to run it multiple times. just check the Options bellow.
<p align="right">(<a href="#top">back to top</a>)</p>

<!-- Options -->
## Options
|flag|description|default value|
|---|---|---|
|-p, --path <package.json...>|path to your package.json(s)|package.json|
|-l, --lock-path \<lock file path\>|path to your lock file|package-lock.json|
|-n, --node_modules|ignore lock file and read versions from node_modules|
|-m, --mono-repo|feeze all package.json files on mono repo|-|
<p align="right">(<a href="#top">back to top</a>)</p>


<!-- CONTRIBUTING -->
## Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See [`LICENSE`](https://github.com/ars2062/freeze-package-versions/blob/master/LICENSE) for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Arshia Moghaddam - [linkedin](https://www.linkedin.com/in/arshia-moghaddam-9357081a4/) - ars2062@gmail.com

Project Link: [https://github.com/ars2062/freeze-package-versions](https://github.com/ars2062/freeze-package-versions)

<p align="right">(<a href="#top">back to top</a>)</p>