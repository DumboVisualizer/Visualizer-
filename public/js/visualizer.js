$(document).ready(() => {
    const audioContext = new(window.AudioContext || window.webkitAudioContext)();

    const source = audioContext.createMediaElementSource(document.getElementById("testAudio"));
    source.connect(audioContext.destination);
    const masterGain = audioContext.createGain();
    const analyser = audioContext.createAnalyser();
    source.connect(analyser);
    masterGain.connect(analyser);

    const spectrum = new Uint8Array(analyser.frequencyBinCount);;
    (function updateSpectrum() {
        requestAnimationFrame(updateSpectrum)
        analyser.getByteFrequencyData(spectrum)
    })()

    function initQuad(gl) {
        const vbo = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
        const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
    }

    function renderQuad(gl) {
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }

    function createShader(gl, vertexShaderSrc, fragmentShaderSrc) {
        const vertexShader = gl.createShader(gl.VERTEX_SHADER)
        gl.shaderSource(vertexShader, vertexShaderSrc)
        gl.compileShader(vertexShader)
        if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
            throw new Error(gl.getShaderInfoLog(vertexShader))
        }

        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
        gl.shaderSource(fragmentShader, fragmentShaderSrc)
        gl.compileShader(fragmentShader)
        if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
            throw new Error(gl.getShaderInfoLog(fragmentShader))
        }

        const shader = gl.createProgram()
        gl.attachShader(shader, vertexShader)
        gl.attachShader(shader, fragmentShader)
        gl.linkProgram(shader)
        gl.useProgram(shader)

        return shader
    }

    function createTexture(gl) {
        const texture = gl.createTexture()
        gl.bindTexture(gl.TEXTURE_2D, texture)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        return texture
    }

    function copyAudioDataToTexture(gl, audioData, textureArray) {
        for (let i = 0; i < audioData.length; i++) {
            textureArray[4 * i + 0] = audioData[i] // R
            textureArray[4 * i + 1] = audioData[i] // G
            textureArray[4 * i + 2] = audioData[i] // B
            textureArray[4 * i + 3] = 255 // A
        }
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, audioData.length, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, textureArray)
    }

    const fragCanvas = document.getElementById('fragment')
    fragCanvas.width = fragCanvas.parentNode.offsetWidth
    fragCanvas.height = fragCanvas.width
    const gl = fragCanvas.getContext('webgl') || fragCanvas.getContext('experimental-webgl')
    const vertexShaderSrc = vertexShader
    const fragmentShaderSrc = fragmentShader
    const fragShader = createShader(gl, vertexShaderSrc, fragmentShaderSrc)

    const fragPosition = gl.getAttribLocation(fragShader, 'position')
    gl.enableVertexAttribArray(fragPosition)
    const fragTime = gl.getUniformLocation(fragShader, 'time')
    gl.uniform1f(fragTime, audioContext.currentTime)
    const fragResolution = gl.getUniformLocation(fragShader, 'resolution')
    gl.uniform2f(fragResolution, fragCanvas.width, fragCanvas.height)
    const fragUserInput1 = gl.getUniformLocation(fragShader, 'userInput_1')
    gl.uniform1f(fragUserInput1, $("unknown_1").val())
    const fragUserInput2 = gl.getUniformLocation(fragShader, 'userInput_2')
    gl.uniform1f(fragUserInput1, $("unknown_2").val())
    const fragUserInput3 = gl.getUniformLocation(fragShader, 'userInput_3')
    gl.uniform1f(fragUserInput1, $("unknown_3").val())
    const fragUserInput4 = gl.getUniformLocation(fragShader, 'userInput_4')
    gl.uniform1f(fragUserInput1, $("unknown_4").val())
    const fragUserInput5 = gl.getUniformLocation(fragShader, 'userInput_5')
    gl.uniform1f(fragUserInput1, $("unknown_5").val())
    const fragUserInput6 = gl.getUniformLocation(fragShader, 'userInput_6')
    gl.uniform1f(fragUserInput1, $("unknown_6").val())
    // const fragUserInput7 = gl.getUniformLocation(fragShader, 'userInput_7')
    // gl.uniform1f(fragUserInput1, $("unknown_7").val())
    // const fragUserInput8 = gl.getUniformLocation(fragShader, 'userInput_8')
    // gl.uniform1f(fragUserInput1, $("unknown_8").val())
    // const fragUserInput9 = gl.getUniformLocation(fragShader, 'userInput_9')
    // gl.uniform1f(fragUserInput1, $("unknown_9").val())
    const fragSpectrumArray = new Uint8Array(4 * spectrum.length)
    const fragSpectrum = createTexture(gl)

    initQuad(gl)

    ;
    (function renderFragment() {
        requestAnimationFrame(renderFragment)
        gl.uniform1f(fragTime, audioContext.currentTime)
        gl.uniform1f(fragUserInput1, $("#unknown_1").val())
        gl.uniform1f(fragUserInput2, $("#unknown_2").val())
        gl.uniform1f(fragUserInput3, $("#unknown_3").val())
        gl.uniform1f(fragUserInput4, $("#unknown_4").val())
        gl.uniform1f(fragUserInput5, $("#unknown_5").val())
        gl.uniform1f(fragUserInput6, $("#unknown_6").val())
        // gl.uniform1f(fragUserInput7, $("#unknown_7").val())
        // gl.uniform1f(fragUserInput8, $("#unknown_8").val())
        // gl.uniform1f(fragUserInput9, $("#unknown_9").val())
        copyAudioDataToTexture(gl, spectrum, fragSpectrumArray)
        renderQuad(gl)
    })()
});