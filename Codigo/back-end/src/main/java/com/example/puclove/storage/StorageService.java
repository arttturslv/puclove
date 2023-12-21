package com.example.puclove.storage;

import com.example.puclove.filedata.FileData;
import com.example.puclove.filedata.FileDataRepository;
import com.example.puclove.user.User;
import com.example.puclove.user.UserService;
import com.example.puclove.userimage.UserImage;
import com.example.puclove.userimage.UserImageRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class StorageService {
    @Autowired
    private FileDataRepository fileDataRepository;
    @Autowired
    private UserImageRepository userImageRepository;
    @Autowired
    private UserService userService;

    String projectPath = System.getProperty("user.dir");
    Path frontEndPath = Paths.get(projectPath);

    private final String FOLDER_PATH = Paths.get(frontEndPath.toString(), "Codigo","front-end", "src", "assets", "images").toString();
    
    /**
     * Salva uma imagem de usuário no sistema de arquivos.
     * @param file
     * @param user
     * @return caminho da imagem salva.
     * @throws IOException
     */
    public String uploadUserImageToFileSystem(MultipartFile file, User user) throws IOException {
        String filePath = FOLDER_PATH + "\\"+ file.getOriginalFilename();
        fileDataRepository.save(FileData.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .filePath(filePath)
                .build());

        file.transferTo(new File(filePath));

        userImageRepository.save(UserImage.builder()
                .userId(new ObjectId(user.getId()))
                .imagePath(filePath)
                .build());

        return filePath;
    }

    /**
     * Faz o download de uma imagem do sistema de arquivos.
     * @param fileName
     * @return arquivo de imagem.
     * @throws IOException
     */
    public byte[] downloadImageFromFileSystem(String fileName) throws IOException {
        Optional<FileData> fileData = fileDataRepository.findByName(fileName);
        String filePath=fileData.get().getFilePath();
        return Files.readAllBytes(new File(filePath).toPath());
    }

    /**
     * Faz o download de todas as imagens de um usuário do sistema de arquivos.
     * @return lista de arquivos de imagem.
     * @throws IOException
     */
    public List<byte[]> downloadUserImagesFromFileSystem(String userId) throws IOException {
        User user = userService.findUserById(userId).orElse(null);

        if (user != null) {
            List<UserImage> userImages = userImageRepository.findUserImageByUserId(new ObjectId(user.getId()));

            List<byte[]> imageBytesList = new ArrayList<>();

            for (UserImage userImage : userImages) {
                String imagePath = userImage.getImagePath();
                byte[] imageBytes = Files.readAllBytes(new File(imagePath).toPath());
                imageBytesList.add(imageBytes);
            }

            return imageBytesList;
        } else {
            return Collections.emptyList();
        }
    }

    /**
     * Retorna uma lista de objetos UserImage de um usuário.
     * @return lista de objetos UserImage.
     */
    public List<UserImage> userImages(String userId) {
        User user = userService.findUserById(userId).orElse(null);

            if (user != null) {
                return userImageRepository.findUserImageByUserId(new ObjectId(user.getId()));
            } else {
                return Collections.emptyList();
            }
    }
}
