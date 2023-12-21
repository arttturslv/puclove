package com.example.puclove.storage;

import com.example.puclove.user.User;
import com.example.puclove.userimage.UserImage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

/**
 * Controller para o armazenamento de arquivos no sistema.
 */

@RestController()
@CrossOrigin("http://localhost:5173")
@RequestMapping("/api/v1/image")
public class StorageController {
    @Autowired
    private StorageService storageService;

    /**
     * Endpoint para upload de imagens de usuário. Espera um arquivo de imagem e o usuário autenticado.
     * @param file
     * @param user
     * @return ResponseEntity com o caminho da imagem salva no sistema de arquivos.
     * @throws IOException
     */
    @PostMapping
    public ResponseEntity<?> uploadUserImageToFileSystem(@RequestParam("image") MultipartFile file,
                                                     @AuthenticationPrincipal User user) throws IOException {
        String uploadImage = storageService.uploadUserImageToFileSystem(file, user);
        return ResponseEntity.status(HttpStatus.OK)
                .body(uploadImage);
    }

    /**
     * Endpoint para download de imagens do sistema de arquivos. Espera o nome do arquivo.
     * @param fileName
     * @return ResponseEntity com o arquivo de imagem.
     * @throws IOException
     */
    @GetMapping("/{fileName}")
    public ResponseEntity<?> downloadImageFromFileSystem(@PathVariable String fileName) throws IOException {
        byte[] imageData=storageService.downloadImageFromFileSystem(fileName);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(imageData);
    }

    /**
     * Endpoint para download de imagens de usuário do sistema de arquivos. Espera o username do usuário.
     * @return ResponseEntity com o arquivo de imagem.
     * @throws IOException
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> downloadUserImagesFromFileSystem(@PathVariable String userId) throws IOException {
        List<byte[]> imagesData = storageService.downloadUserImagesFromFileSystem(userId);

        if (imagesData.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(imagesData);
    }

    /**
     * Endpoint para objetos userImages. Espera um Id de usuário.
     * @return ResponseEntity com lista de objetos userImages.
     */
    @GetMapping("/filepath/{userId}")
    public ResponseEntity<List<UserImage>> getUserImages(@PathVariable String userId){
        List<UserImage> userImages = storageService.userImages(userId);

        if (userImages.isEmpty())
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        return new ResponseEntity<>(userImages, HttpStatus.OK);
    }

}
